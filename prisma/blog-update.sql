-- Additive, repeatable upgrade; existing articles retain their content and dates.
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "kind" TEXT NOT NULL DEFAULT 'ARTICLE';
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "sourceUrl" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "dateApproximate" BOOLEAN NOT NULL DEFAULT false;
