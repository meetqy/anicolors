# HiColors

![cover](https://hicolors.org/og.jpg)

Extract colors from anime/game images and generate 5-color palettes!

Live Demo: [hicolors.org](https://hicolors.org)

## Features

- ✅ Easy to use - drag and drop to automatically identify colors in images
- ✅ Supports multiple image formats including PNG, JPG, GIF, etc.
- ✅ Provides various palette styles to meet different needs
- ✅ Supports custom color point positioning for personalized palettes
- ✅ Export palettes as JSON format for easy saving and sharing

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
