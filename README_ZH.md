# HiColors

![cover](https://hicolors.org/og.jpg)

快速搭建一个从图片中提取颜色，生成 5 色调色板的开源项目。

在线 DEMO：[hicolors.org](https://hicolors.org)

开源地址：

- https://github.com/meetqy/hicolors
- https://gitee.com/meetqy/hicolors

## 特色

- ✅ 使用简单，拖拽自动识别图片中的颜色
- ✅ 支持多种图片格式，包括 PNG、JPG、GIF 等
- ✅ 提供多种风格的调色板，满足不同需求
- ✅ 支持自定义颜色点位置，生成个性化调色板
- ✅ 支持导出调色板为 JSON 格式，方便保存和分享
- ✅ 基于 Strapi，后续可扩展更多功能，如用户管理、权限控制等

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
