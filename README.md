# Next.js + Supabase 用户登录项目

这是一个使用 Next.js 和 Supabase 实现的用户登录功能示例项目。

## 功能特性

- 用户邮箱密码登录
- 用户注册功能
- 自动跳转到登录页（未登录时）
- 显示用户信息
- 登出功能

## 环境配置

1. 复制 `.env.local.example` 为 `.env.local`
2. 在 `.env.local` 中填入你的 Supabase 项目信息：
   - `NEXT_PUBLIC_SUPABASE_URL`: 你的 Supabase 项目 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 配置 Supabase

1. 在 Supabase 控制台中启用 Email/Password 认证
2. 确保数据库中创建了 `students_score` 表（可选，用于演示）

## 项目结构

- `/app/page.tsx` - 主页，显示用户信息和登出按钮
- `/app/login/page.tsx` - 登录页面
- `/app/auth/logout/route.ts` - 登出 API 路由
- `/lib/supabaseClient.ts` - Supabase 客户端配置
- `/types/supabase.ts` - TypeScript 类型定义

## 使用说明

1. 访问 `/login` 页面进行登录或注册
2. 登录成功后自动跳转到主页
3. 在主页可以查看用户信息和登出
4. 登出后会自动跳转到登录页
