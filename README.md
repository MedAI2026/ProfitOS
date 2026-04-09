# ProfitOS Demo

`ProfitOS — 电厂生产经营收益操作系统` 演示系统。

这是一个面向火电厂 / 综合能源电厂场景的前端 Demo，用于客户汇报、产品展示和方案说明。系统重点不是做传统 BI 或单一现货报价页，而是展示“生产经营一体化决策”的产品形态：

- 围绕成本、负荷、市场、现货、深调、碳与收益优化构建统一经营中枢
- 用 `Power Graph + Twin Sandbox + Agent Runtime` 表达底层共享架构
- 用 mock 数据完整串联角色视角、智能体协同、收益解释与情景推演
- 强调“帮助决定下一步怎样更赚钱”，而不是“统计已经赚了多少钱”

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Recharts
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

- [http://localhost:6173](http://localhost:6173)

生产构建：

```bash
npm run build
```

GitHub Pages 构建：

```bash
npm run build:pages
```

## 已实现页面

1. `总收益中枢首页`
2. `收益总览中心`
3. `实时成本工作台`
4. `机组负荷与工况收益工作台`
5. `市场与现货决策中心`
6. `深调收益分析中心`
7. `碳资产与双碳收益中心`
8. `Twin Sandbox 经营仿真沙盘`
9. `智能体策略中心`
10. `经营驾驶舱 / 管理层视角`

## 已实现核心能力

- 角色视角切换
  - 经营负责人
  - 值长 / 运行负责人
  - 市场交易人员
  - 厂领导
- 三大共享底层能力展示
  - `Power Graph`
  - `Twin Sandbox`
  - `Agent Runtime`
- 多经营维度收益表达
  - 总收益
  - 边际收益 / 边际成本
  - 供热收益
  - 现货收益
  - 深调收益
  - 碳收益
  - 风险损失预估
- 智能体协同演示剧本
  - 煤价上涨后的收益策略调整
  - 现货价格波动触发报价建议重算
  - 高热负荷约束下的经营优化
- Twin Sandbox 交互推演
  - 负荷变化
  - 煤价变化
  - 热负荷变化
  - 现货价格变化
  - 深调程度变化
  - 碳价变化

## 目录结构

```text
src/
  app/         应用入口与全局样式
  components/  通用基础组件
  hooks/       组合业务模型与派生状态
  layouts/     应用布局
  mock/        mock 经营数据
  modules/     复合业务模块
  pages/       页面级工作台
  routes/      路由配置
  store/       Zustand 状态管理
  types/       业务类型定义
  utils/       格式化与推演计算
  widgets/     可复用业务卡片组件
```

## Mock 数据设计

系统内 mock 数据已覆盖以下主题：

- 角色画像
- 导航与产品结构
- 收益汇总指标
- 机组实时负荷与边际指标
- 实时成本与成本驱动因子
- 现货市场窗口与报价区间
- 深调收益测算
- 碳资产与碳收益
- Power Graph / Twin Sandbox / Agent Runtime 架构信息
- 多智能体状态、触发来源、最新输出与推荐动作
- 三个协同剧本
- 沙盘预设情景
- 管理层决策事项与驾驶舱信号

## 演示建议路径

推荐按以下顺序向客户讲述：

1. 从 `总收益中枢首页` 打开，先说明 ProfitOS 不是传统报表平台
2. 进入 `收益总览中心`，讲收益构成、边际收益和收益变化解释
3. 切到 `市场与现货决策中心` 或 `实时成本工作台`，讲经营动作依据
4. 进入 `Twin Sandbox`，演示“不是看历史，而是推演未来”
5. 最后进入 `智能体策略中心`，点击 3 个协同剧本展示 Agent Runtime
6. 用 `经营驾驶舱` 收束到管理层视角，体现策略执行与收益达成

## 当前说明

- 全部页面均使用 mock 数据驱动
- 无后端、无数据库、无真实登录
- 已完成本地构建验证
- 已验证开发服务器可在 `localhost:6173` 启动

## 部署地址

GitHub Pages 已配置自动部署工作流：

- 目标地址：[https://medai2026.github.io/ProfitOS/](https://medai2026.github.io/ProfitOS/)
- 触发方式：推送到 `main` 后自动构建并发布
- 工作流文件：`.github/workflows/deploy-pages.yml`

Vercel 已配置静态部署：

- 配置文件：`vercel.json`
- 导入仓库后可直接构建，无需额外改写 SPA 路由配置
- 实际 Vercel 域名会在你把仓库接入 Vercel 后自动生成
