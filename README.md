# 艾尔登法环：黑夜君临 敌人数据查询

一个基于 React + TypeScript + Vite 构建的敌人数据检索工具，用来快速查询《艾尔登法环：黑夜君临》中的敌人属性、种族标签、生命值、韧性和弱点倍率。

## 项目特性

- 支持按敌人名称、ID、`Boss`、`小怪`、种族关键词进行搜索
- 支持按虚空、死诞、古龙、普通龙等标签筛选
- 支持生命值与韧性区间过滤
- 支持表格排序、分页浏览
- 针对移动端补充了卡片化结果视图
- 内置统计卡片，快速查看 Boss 数量、平均生命、最高韧性等信息

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React

## 本地开发

先进入前端目录：

```bash
cd app
```

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

代码检查：

```bash
npm run lint
```

## 搜索与筛选说明

搜索框当前会匹配这些内容：

- 敌人名称
- 敌人 ID
- `boss`
- `小怪`
- `虚空`
- `死诞`
- `古龙`
- `普通龙`

示例：

- 搜 `boss` 可以快速定位首领敌人
- 搜 `虚空` 可以查看全部虚空敌人
- 搜 `44700010a` 可以直接定位单条数据

筛选区支持：

- 种族筛选
- 生命值最小值 / 最大值
- 韧性最小值 / 最大值
- 仅 Boss / 仅小怪

## 数据来源

项目使用根目录下的 `enemy_data.json` 作为原始数据源，运行和构建后通过前端静态资源方式读取。

## 目录结构

```text
app/
├─ public/                 静态资源
├─ src/
│  ├─ components/          页面组件与 UI 组件
│  ├─ hooks/               业务 hooks
│  ├─ lib/                 公共工具函数
│  ├─ types/               类型定义
│  ├─ App.tsx              应用主界面
│  ├─ index.css            全局样式
│  └─ main.tsx             应用入口
├─ index.html
├─ package.json
└─ vite.config.ts
```

## 已验证

- `npx tsc --noEmit` 通过
- `npm run build` 通过

说明：

- 当前 `npm run lint` 仍存在项目原有的基础 UI 组件规则报错，不影响本次搜索功能和界面优化的构建结果

## 后续可扩展方向

- 增加更多状态抗性字段筛选
- 增加多条件组合标签栏
- 增加详情抽屉或敌人对比视图
- 支持导出当前筛选结果

访问https://datanighter.hellcious.cloud/ 或 https://datanigther.hellcious.lol/
