import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
const db = vi.hoisted(() => ({ findMany: vi.fn(), findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() }));
vi.mock('../api/lib/prisma', () => ({ default: { blogPost: db } }));
import handler, { validatePost } from '../api/blog/index';
import { videoEmbedUrl } from '../src/app/core/blog-utils';
const post = { title: 'A post', excerpt: 'Summary', date: '2026-05-01', content: ['Text'], tags: [], readTime: '2 min read', kind: 'LINKEDIN', dateApproximate: true };
function response() { const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis(), end: vi.fn().mockReturnThis(), setHeader: vi.fn() }; return res; }
function request(method: string, body: any = {}, query: any = {}, authenticated = true): any {
  return { method, body, query, headers: authenticated ? { authorization: 'Bearer ' + jwt.sign({ id: 'test-admin' }, 'test-only') } : {} };
}
beforeEach(() => { vi.clearAllMocks(); process.env['JWT_SECRET'] = 'test-only'; });
describe('blog input validation', () => {
  it('normalizes old publication dates and only accepts supported fields', () => {
    const data = validatePost({ ...post, date: 'January 2, 2023', id: 'injected', createdAt: '2026-01-01' });
    expect(data.date).toBe('2023-01-02'); expect(data.slug).toBe('a-post'); expect(data).not.toHaveProperty('createdAt'); expect(data).not.toHaveProperty('id');
  });
  it.each(['2026-02-30', 'not a date', ''])('rejects invalid date %s', date => expect(() => validatePost({ ...post, date })).toThrow());
  it.each(['https://linkedin.com.evil.test/posts/a', 'javascript:alert(1)', 'https://evil.test'])('rejects unsafe source %s', sourceUrl => expect(() => validatePost({ ...post, sourceUrl })).toThrow());
  it('accepts original LinkedIn links', () => expect(validatePost({ ...post, sourceUrl: 'https://www.linkedin.com/posts/test' }).sourceUrl).toContain('linkedin.com'));
  it('allowlists embed hosts and retains Vimeo private hashes', () => {
    expect(videoEmbedUrl('https://player.vimeo.com/video/1186303183?h=ab0dac3989')).toBe('https://player.vimeo.com/video/1186303183?h=ab0dac3989');
    expect(videoEmbedUrl('https://streamable.com/e/xtpk0b?')).toBe('https://streamable.com/e/xtpk0b');
    expect(videoEmbedUrl('https://player.vimeo.com.evil.test/video/1')).toBeNull();
    expect(videoEmbedUrl('<iframe src="https://streamable.com/e/test">')).toBeNull();
  });
});
describe('blog API', () => {
  it('sorts by publication date rather than import date', async () => {
    db.findMany.mockResolvedValue([{ date: '2023-01-02', createdAt: new Date('2026-09-19') }, { date: '2026-05-01', createdAt: new Date('2026-09-01') }]);
    const res = response(); await handler(request('GET'), res); expect(res.json.mock.calls[0][0][0].date).toBe('2026-05-01');
  });
  it.each(['POST', 'PUT', 'DELETE'])('rejects unauthenticated %s', async method => {
    const res = response(); await handler(request(method, post, {}, false), res); expect(res.status).toHaveBeenCalledWith(401); expect(db.create).not.toHaveBeenCalled(); expect(db.update).not.toHaveBeenCalled(); expect(db.delete).not.toHaveBeenCalled();
  });
  it('creates and updates validated content', async () => {
    let res = response(); await handler(request('POST', post), res); expect(res.status).toHaveBeenCalledWith(201); expect(db.create.mock.calls[0][0].data.dateApproximate).toBe(true);
    res = response(); await handler(request('PUT', { ...post, id: 'one', createdAt: 'bad' }), res); expect(db.update.mock.calls[0][0].where.id).toBe('one'); expect(db.update.mock.calls[0][0].data).not.toHaveProperty('createdAt');
  });
  it('deletes the specified post only', async () => { const res = response(); await handler(request('DELETE', {}, { id: 'one' }), res); expect(db.delete).toHaveBeenCalledWith({ where: { id: 'one' } }); expect(res.status).toHaveBeenCalledWith(204); });
  it('returns useful errors for invalid input and duplicate slugs', async () => {
    let res = response(); await handler(request('POST', { ...post, content: [] }), res); expect(res.status).toHaveBeenCalledWith(400);
    db.create.mockRejectedValue({ code: 'P2002' }); res = response(); await handler(request('POST', post), res); expect(res.status).toHaveBeenCalledWith(409);
  });
  it('returns 404 for missing articles', async () => { db.findFirst.mockResolvedValue(null); const res = response(); await handler(request('GET', {}, { slug: 'missing' }), res); expect(res.status).toHaveBeenCalledWith(404); });
});
