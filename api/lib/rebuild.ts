// Ask Vercel to rebuild the site so new or changed blog posts and courses get prerendered
// pages (and drop deleted ones). DEPLOY_HOOK_URL is a Vercel Deploy Hook for the main branch.
// Never throws: content saves must not fail because a rebuild could not be requested.
export async function requestRebuild(): Promise<void> {
  const hook = process.env['DEPLOY_HOOK_URL'];
  if (!hook) return;
  try {
    await fetch(hook, { method: 'POST', signal: AbortSignal.timeout(4000) });
  } catch (e) {
    console.warn('[rebuild] deploy hook failed', e);
  }
}
