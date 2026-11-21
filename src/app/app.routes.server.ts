import { RenderMode, ServerRoute } from '@angular/ssr';

const API_ORIGIN = 'https://www.p41.be';

async function fetchList(path: string): Promise<any[]> {
  try {
    const res = await fetch(API_ORIGIN + path);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // Build must not fail when the API is unreachable; these pages then fall back to client rendering.
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  // Private: never prerendered, client-only, noindex (see vercel.json headers).
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: 'academy/access/:purchaseId', renderMode: RenderMode.Client },

  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const posts = await fetchList('/api/blog');
      return posts.map(p => ({ slug: String(p.slug || p.id) }));
    }
  },
  {
    path: 'academy/:courseId',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const courses = await fetchList('/api/academy');
      return courses.map(c => ({ courseId: String(c.id) }));
    }
  },

  { path: '**', renderMode: RenderMode.Prerender }
];
