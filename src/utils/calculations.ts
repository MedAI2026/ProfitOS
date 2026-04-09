import { SandboxOutcome, SandboxParams, ScenarioAdjustment, SummaryMetric } from '@/types/domain';

const defaultAdjustment: ScenarioAdjustment = {
  revenueDelta: 0,
  costDelta: 0,
  carbonDelta: 0,
  riskDelta: 0,
};

export function calculateSandboxOutcome(
  metrics: SummaryMetric[],
  params: SandboxParams,
  adjustment: ScenarioAdjustment = defaultAdjustment,
): SandboxOutcome {
  const totalRevenueMetric = metrics.find((item) => item.id === 'totalRevenue');
  const marginalRevenueMetric = metrics.find((item) => item.id === 'marginalRevenue');
  const marginalCostMetric = metrics.find((item) => item.id === 'marginalCost');

  const baseRevenue = totalRevenueMetric?.value ?? 180;
  const baseMarginalRevenue = marginalRevenueMetric?.value ?? 0.46;
  const baseMarginalCost = marginalCostMetric?.value ?? 0.33;

  const revenueDelta =
    params.loadDelta * 1.6 +
    params.spotPriceDelta * 2.8 -
    params.coalPriceDelta * 1.9 +
    params.heatLoadDelta * 0.9 +
    params.deepRegulationDelta * 1.3 -
    params.carbonPriceDelta * 0.6 +
    adjustment.revenueDelta;

  const totalRevenue = baseRevenue + revenueDelta;
  const totalCost =
    124.5 +
    params.coalPriceDelta * 2.2 +
    params.loadDelta * 0.5 +
    params.heatLoadDelta * 0.6 +
    params.deepRegulationDelta * 1.1 +
    params.carbonPriceDelta * 0.2 +
    adjustment.costDelta;

  const carbonImpact =
    12.8 +
    params.carbonPriceDelta * 1.4 +
    params.loadDelta * 0.2 +
    params.deepRegulationDelta * 0.4 +
    adjustment.carbonDelta;

  const riskIndex = Math.max(
    12,
    34 +
      params.deepRegulationDelta * 2.2 +
      params.heatLoadDelta * 1.2 +
      params.coalPriceDelta * 0.8 -
      params.spotPriceDelta * 0.6 +
      adjustment.riskDelta,
  );

  const marginalSpread =
    baseMarginalRevenue -
    baseMarginalCost +
    params.spotPriceDelta * 0.005 -
    params.coalPriceDelta * 0.004 -
    params.carbonPriceDelta * 0.002;

  const actionBullets = [
    params.coalPriceDelta > 0
      ? '压缩低边际收益时段，优先保持高热值煤对应机组在线。'
      : '煤价侧压力可控，可释放部分高效率机组追踪市场机会。',
    params.spotPriceDelta > 0
      ? '扩大日内报价弹性区间，并留出深调可逆调节余量。'
      : '收敛报价区间，转向供热保障与成本稳态。',
    riskIndex > 40
      ? '提高设备约束权重，要求收益协调智能体按风险上限重新筛选策略。'
      : '允许收益协调智能体优先执行收益抬升方案。',
  ];

  const recommendedStrategy =
    riskIndex > 44
      ? '风险约束优先：锁定供热与设备边界，保留现货追涨能力但减少深调暴露。'
      : totalRevenue > baseRevenue
        ? '收益优先：提高市场响应度，维持高效率机组在最优负荷区间运行。'
        : '稳态经营：通过热电协同和报价收敛控制收益回撤。';

  return {
    totalRevenue,
    totalCost,
    carbonImpact,
    riskIndex,
    marginalSpread,
    recommendedStrategy,
    actionBullets,
    contributionSeries: [
      { name: '现货收益', base: 41.2, scenario: 41.2 + params.spotPriceDelta * 2.5 },
      { name: '供热收益', base: 38.6, scenario: 38.6 + params.heatLoadDelta * 1.1 },
      {
        name: '深调收益',
        base: 16.8,
        scenario: 16.8 + params.deepRegulationDelta * 1.8,
      },
      {
        name: '碳收益',
        base: 8.9,
        scenario: 8.9 - params.carbonPriceDelta * 0.7 - params.loadDelta * 0.15,
      },
      { name: '风险损失', base: -7.4, scenario: -7.4 - (riskIndex - 34) * 0.18 },
    ],
  };
}
