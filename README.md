# Your Vibe Glow

Your Vibe Glow is a self-care and mood-tracking website designed to make everyday reflection feel personal, creative, and easy to return to. It brings mood check-ins, habit tracking, journaling, and inspiration gathering together in one welcoming space.

Start with the vibe quiz to discover a profile such as Soft Glow, Clean Girl, Dark Feminine, or Balanced Muse. Your result shapes the dashboard’s look and helps guide the suggestions you see. From there, you can use the app to build small routines and record how you’re feeling.

You can make a profile and login every time with saved information.
## Features

- **Vibe quiz:** Take a short quiz and discover your current vibe.
- **Personalized dashboard:** See your vibe, daily progress, and suggestions.
- **Daily habit tracker:** Track routines across spirituality, health, skin, hair, and creativity.
- **Mood check-ins:** Choose a mood and reflect on small moments from your day.
- **Decorated journal:** Write entries, choose a cover and font, and add movable stickers.
- **Moodboard:** Add inspiration photos, captions, and a personal board title.
- **Personalized suggestions:** Explore ideas based on your selected vibe.

Your Vibe Glow is for anyone who wants a more expressive way to keep track of moods, routines, and ideas. Its aim is to make self-care feel less like a checklist and more like a personal practice you can shape to fit yourself.

## Run locally

This project uses Node.js 24 and pnpm.
Typescript
```bash
pnpm install
pnpm --filter @workspace/your-vibe-glow run dev
```

## Publish with GitHub Pages

The included GitHub Actions workflow builds and publishes the website when changes are pushed to the `main` or `master` branch.

1. Upload or push the project files to your GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Set the publishing source to **GitHub Actions**.
4. Open the **Actions** tab and wait for “Deploy Your Vibe Glow to GitHub Pages” to finish.

For a regular repository, the site will be available at `https://<your-username>.github.io/<repository-name>/`. The workflow also supports repositories named `<your-username>.github.io`.

## Data storage

App data is currently stored in the browser. It stays with that browser and device; using a different browser or the GitHub Pages address starts with separate data.
