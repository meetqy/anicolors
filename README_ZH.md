# HiColors - 发现和制作 ACG 色彩调色板

![cover](https://hicolors.org/og.jpg)

HiColors 不仅仅是一个图片拾色器还是 ACG 色彩档案馆。

在线 DEMO：[hicolors.org](https://hicolors.org)

开源地址：

- https://github.com/meetqy/hicolors
- https://gitee.com/meetqy/hicolors

## 两大核心功能

### 1. 🎨 每日精选 · 灵感调色板画廊 (Inspiration Palette Gallery)

这不只是算法的堆砌，这是我们作为 ACG 深度爱好者的人工精选。
我每天都会沉浸在海量的动漫、游戏、漫画和官方艺术设定中，手动为你挑选最值得品味的素材，并制作成精美的调色板详情页。在这里，你会发现：

- 角色专属色卡： 从「Saber」的骑士之甲到「初音未来」的葱绿发色。
- 场景氛围色卡： 「新海诚」电影中的天空，「赛博朋克：边缘行者」的霓虹夜之城。
- 作品主题色卡： 「女神异闻录 5」的红与黑，「孤独摇滚」的青春色调。
  每一张调色板都包含精准的 HEX 色码，可以直接用于你的创作，或者纯粹作为壁纸、设计素材来欣赏。

### 2. 🛠️ 强大易用 · 自定义调色板生成器 (Custom Palette Generator)

如果你有自己珍藏的图片，或者想分析某张特定 Fanart 的配色，我们的工具可以帮你实现。

- 上传任何图片： 将你手机里的截图、下载的壁纸拖拽进来。
- 像素级精准拾色： 使用放大镜工具，精准定位到角色的瞳孔、服装的褶皱，获取你最想要的那一抹颜色。
- 一键导出与分享： 生成的调色板可以导出为高清图片或直接复制色码，方便你在 Procreate, Photoshop 或任何设计软件中使用。

## 技术特色

- ✅ 使用简单，拖拽自动识别图片中的颜色
- ✅ 支持多种图片格式，包括 PNG、JPG、GIF 等
- ✅ 提供多种风格的调色板模板，满足不同设计需求
- ✅ 支持自定义颜色点位置，生成个性化调色板
- ✅ 专为动漫、游戏角色设计优化的色彩提取算法
- ✅ 支持导出调色板，方便保存和分享
- ✅ 基于 Strapi 构建，后续可扩展更多功能

## 本地部署

- nextjs 前端应用，使用 Next.js 框架构建
- strapi 后端应用，使用 Strapi 框架构建

### strapi

1. 安装依赖

```bash
cd strapi
pnpm install
```

2. 复制 .env.example 文件为 .env

```bash
cp .env.example .env
```

3. 启动 Strapi

```bash
pnpm develop
```

> 开发环境会自动使用本地的资源管理系统，不会上传到 cloudflare r2.

### nextjs

1. 安装依赖

```bash
cd nextjs
pnpm install
```

2. 复制 .env.example 文件为 .env

```bash
cp .env.example .env
```

3. 启动 Next.js

```bash
pnpm dev
```

## 开源协议

本项目采用 [AGPL License](./LICENSE) 协议开源。
