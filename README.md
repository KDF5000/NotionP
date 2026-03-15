<h1 align="center">NotionP</h1>

<p align="center">
  A clean, fast Notion-powered personal blog built with Next.js 14 + TypeScript.
</p>

<p align="center">
  <a href="https://pcursor.run" rel="nofollow">Live Demo</a>
  ·
  <a href="./README.en.md">English README</a>
</p>

---

## 介绍

NotionP 是一个使用 Notion Database 作为 CMS 的博客模板，支持：

- 文章列表（支持搜索 / 标签筛选）
- 文章详情页（基于 react-notion-x 渲染 Notion 页面）
- 全局暗黑模式
- 图片代理（解决 Notion 临时链接过期导致裂图）
- 动态 OG 图片（用于社交分享预览）

## 项目截图

<table>
  <tr>
    <td align="center"><img src="./docs/screenshots/home.png" alt="首页" width="480" /></td>
    <td align="center"><img src="./docs/screenshots/post.png" alt="文章详情" width="480" /></td>
  </tr>
</table>

## 技术栈

- Next.js 14 (Pages Router)
- React 18
- TypeScript
- Tailwind CSS
- react-notion-x / notion-client / notion-utils
- next-themes（暗黑模式）

## 快速开始（本地开发）

```bash
npm install
```

创建环境变量文件：

```bash
cp .env.local.example .env.local
```

然后填入：

```bash
NOTION_SECRET_KEY=secret_xxx
```

启动开发环境：

```bash
npm run dev
```

默认访问地址：

- http://localhost:3000 （如果端口被占用会自动切换到 3001/3002...）

## 配置

项目的站点配置在 [site.config.ts](./site.config.ts)：

- `rootDatabaseId`：Notion Database ID（文章列表来源）
- `name` / `domain` / `author` / `description`
- `navigationLinks`：顶部导航

## Notion 数据库要求

NotionP 默认会从数据库中读取以下字段（名称区分大小写）：

- `Name`：文章标题
- `Abstract`：摘要（可选）
- `Tags`：标签（Multi-select，可选）

并会使用 Notion 自带的 `created_time` 作为文章排序依据（最新优先）。

## 部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/KDF5000/NotionP&project-name=notionp&repository-name=notionp)

部署时需要配置环境变量：

- `NOTION_SECRET_KEY`

### 手动部署步骤（推荐流程）

1. Fork 本仓库
2. 在 Notion 创建 Integration 并获取 Secret Key  
   https://www.notion.so/my-integrations
3. 将 Integration 添加到你的 Notion Database 页面（Connections）
4. 修改 [site.config.ts](./site.config.ts) 中的 `rootDatabaseId`
5. 在 Vercel 中导入仓库并配置 `NOTION_SECRET_KEY`

## 常见问题（FAQ）

### 1) 终端出现 /_next/static/chunks/*.js 404

一般是旧的 dev 资源缓存或端口切换导致。可尝试：

```bash
rm -rf .next
npm run dev
```

并在浏览器硬刷新（Cmd+Shift+R）。

### 2) Notion 图片偶发裂图

Notion 的部分图片链接是临时签名 URL，会过期。项目通过 `/api/image` 做了代理转发与缓存，降低裂图概率。

## License

MIT
