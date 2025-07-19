# HiColors - Discover and Create Anime & Game Color Palettes

![cover](https://hicolors.org/og.jpg)

HiColors is more than just an image color picker; it's a color archive inspired by the worlds of **anime, manga, and games.**

Live DEMO: [hicolors.org](https://hicolors.org)

Open Source:

- https://github.com/meetqy/hicolors
- https://gitee.com/meetqy/hicolors

## Two Core Features

### 1. 🎨 Curated Daily · Inspiration Palette Gallery

This isn't just a collection of algorithm-generated palettes. It's a gallery curated by us—**passionate fans of anime and gaming.**
Every day, I dive into a vast sea of anime, games, manga, and official concept art to manually select the most inspiring materials for you, crafting them into beautiful palette detail pages. Here, you will discover:

- **Character Palettes:** From the armor of "Saber" to the teal hair of "Hatsune Miku."
- **Atmospheric Palettes:** The skies from Makoto Shinkai's films, the neon-lit Night City from "Cyberpunk: Edgerunners."
- **Thematic Palettes:** The iconic red and black of "Persona 5," the youthful tones of "Bocchi the Rock!"

Each palette includes precise HEX color codes that you can use directly in your creations, or simply enjoy as wallpapers and design assets.

### 2. 🛠️ Powerful & Easy-to-Use · Custom Palette Generator

If you have your own treasured images or want to analyze the color scheme of a specific piece of fan art, our tool can help you do just that.

- **Upload Any Image:** Simply drag and drop screenshots from your phone or your downloaded wallpapers.
- **Pixel-Perfect Color Picking:** Use the magnifier tool to precisely target a character's eyes or the folds in their clothing to get that exact shade you want.
- **One-Click Export & Share:** Export the generated palette as a high-quality image or copy the color codes directly for use in Procreate, Photoshop, or any other design software.

## Technical Features

- ✅ Simple to use; automatically identifies colors in images via drag-and-drop.
- ✅ Supports multiple image formats, including PNG, JPG, GIF, and more.
- ✅ Offers a variety of palette template styles to suit different design needs.
- ✅ Allows custom positioning of color points to create personalized palettes.
- ✅ Features a color extraction algorithm specifically optimized for **anime and game character designs.**
- ✅ Supports exporting palettes for easy saving and sharing.
- ✅ Built on Strapi, allowing for future feature expansion and scalability.

## Local Deployment

- nextjs frontend application built with Next.js framework
- strapi backend application built with Strapi framework

### Strapi

1. Install dependencies

```bash
cd strapi
pnpm install
```

2. Copy .env.example file to .env

```bash
cp .env.example .env
```

3. Start Strapi

```bash
pnpm develop
```

> Development environment will automatically use local resource management system and won't upload to Cloudflare R2.

### Next.js

1. Install dependencies

```bash
cd nextjs
pnpm install
```

2. Copy .env.example file to .env

```bash
cp .env.example .env
```

3. Start Next.js

```bash
pnpm dev
```

## License

This project is licensed under [AGPL License](./LICENSE).
