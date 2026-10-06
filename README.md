# Beauty by Diella

Website for Beauty by Diella, the makeup artistry of Diella Borici (New Jersey & NYC).

It's a single static page (`index.html`) with no build step, so Vercel serves it as is.

## Photos

The page loads photos from an `images/` folder next to `index.html`:

- `images/about/diella.jpg`
- `images/og-image.jpg` (link preview image)
- `images/site/` (intro and service photos)
- `images/portfolio/<category>/` (bridal, beauty, editorial, events, glam, photoshoots)

Any photo that's missing is simply hidden, so the site works before they're all added.

## Deploying

In Vercel, choose **Add New → Project**, import this repository, and deploy with the default settings (Framework Preset: Other). Every push to `main` redeploys the site.
