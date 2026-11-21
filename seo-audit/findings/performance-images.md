# Performance (est. 45/100) and Images (45/100)

No PageSpeed/CrUX API key, so no field data. Estimates from resources:

| Image | Size | Width |
|---|---|---|
| hero_backgournd.jpg | 1.19 MB | 2560 |
| ives front look.jpg | 1.05 MB | 1902 |
| CrossRoads-22-1-scaled-1.jpg | 0.96 MB | 2560 |
| CrossRoads-29-scaled.jpg | 0.83 MB | 2560 |
| ives_with_mic_hero.png | 0.66 MB | - |

- No `<img>` on any page has width/height (CLS risk). No `fetchpriority` on hero.
- Most images `loading=auto`, including below-fold ones.
- 7 images on /blog missing alt.
- /academy og:image hotlinked from www.blomconsultancy.nl.
- og:image `banner.jpg` is 16 KB; check it is at least 1200x630.
- Render-blocking: Font Awesome full CSS, Material Symbols full font, 2 Google font families.
- Hashed JS/CSS not cached (max-age=0).
Fix: WebP/AVIF at 1600px max, NgOptimizedImage, lazy below fold, preconnect fonts, subset icons.
