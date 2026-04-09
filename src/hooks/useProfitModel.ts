import { useMemo } from 'react';
import {
  agents,
  architecturePillars,
  carbonSnapshot,
  carbonTrend,
  cockpitSignals,
  constraints,
  costDrivers,
  decisionItems,
  deepRegulationCases,
  marketSensitivity,
  marketWindows,
  revenueExplainers,
  revenueTrend,
  roleProfiles,
  sandboxPresets,
  scenarioFeed,
  scenarioScripts,
  summaryMetrics,
  units,
} from '@/mock/profitData';
import { useProfitStore } from '@/store/useProfitStore';
import { calculateSandboxOutcome } from '@/utils/calculations';

export function useProfitModel() {
  const {
    selectedRole,
    activeScriptId,
    explanationId,
    sandboxParams,
    selectedPresetId,
    setRole,
    setActiveScriptId,
    setExplanationId,
    updateSandboxParam,
    applySandboxPreset,
    resetSandbox,
  } = useProfitStore();

  return useMemo(() => {
    const activeRole = roleProfiles.find((role) => role.id === selectedRole) ?? roleProfiles[0];
    const activeScript = scenarioScripts.find((script) => script.id === activeScriptId) ?? null;
    const sandboxOutcome = calculateSandboxOutcome(
      summaryMetrics,
      sandboxParams,
      activeScript?.adjustment,
    );

    const metrics = summaryMetrics.map((metric) => {
      switch (metric.id) {
        case 'totalRevenue':
          return { ...metric, value: sandboxOutcome.totalRevenue };
        case 'marginalRevenue':
          return {
            ...metric,
            value:
              metric.value +
              sandboxParams.spotPriceDelta * 0.004 +
              sandboxParams.loadDelta * 0.0015 +
              (activeScript?.adjustment.revenueDelta ?? 0) * 0.0004,
          };
        case 'marginalCost':
          return {
            ...metric,
            value:
              metric.value +
              sandboxParams.coalPriceDelta * 0.0035 +
              sandboxParams.deepRegulationDelta * 0.0013 +
              (activeScript?.adjustment.costDelta ?? 0) * 0.0006,
          };
        case 'heatRevenue':
          return {
            ...metric,
            value: metric.value + sandboxParams.heatLoadDelta * 1.1,
          };
        case 'spotRevenue':
          return {
            ...metric,
            value:
              metric.value +
              sandboxParams.spotPriceDelta * 2.4 +
              (activeScript?.id === 'spot-reprice' ? 3.2 : 0),
          };
        case 'deepRevenue':
          return {
            ...metric,
            value:
              metric.value +
              sandboxParams.deepRegulationDelta * 1.6 +
              (activeScript?.id === 'coal-price-up' ? -0.8 : 0),
          };
        case 'carbonRevenue':
          return {
            ...metric,
            value:
              metric.value -
              sandboxParams.carbonPriceDelta * 0.7 -
              sandboxParams.loadDelta * 0.12 -
              (activeScript?.adjustment.carbonDelta ?? 0) * 0.2,
          };
        case 'riskLoss':
          return {
            ...metric,
            value: 7.4 + Math.max(0, (sandboxOutcome.riskIndex - 34) * 0.18),
          };
        default:
          return metric;
      }
    });

    const highlightedUnits = units.map((unit) => {
      if (activeScript?.id === 'high-heat-load' && unit.id === 'U3') {
        return {
          ...unit,
          currentLoadMw: unit.currentLoadMw - 6,
          opportunity: '切换供热保障策略后，可回收部分高成本暴露。',
        };
      }

      if (activeScript?.id === 'coal-price-up' && unit.id === 'U1') {
        return {
          ...unit,
          currentLoadMw: unit.currentLoadMw + 18,
          opportunity: '承接高价窗口增发后，仍处收益最优区间。',
        };
      }

      return unit;
    });

    const agentCards = agents.map((agent) => {
      if (activeScript && agent.id === 'coordination-agent') {
        return {
          ...agent,
          latestOutput: activeScript.outcome,
          recommendedAction: activeScript.actions[0],
        };
      }

      if (activeScript && agent.id === 'market-agent' && activeScript.id === 'spot-reprice') {
        return {
          ...agent,
          status: 'running' as const,
          currentFocus: '重算晚峰报价带并更新价格回撤风险边界。',
        };
      }

      return agent;
    });

    const activeExplanation =
      metrics.find((metric) => metric.id === explanationId)?.explanation ?? metrics[0].explanation;

    const quickBrief = {
      opsLead: '系统已把收益变化、机会窗口和关键动作压缩成可执行经营策略。',
      shiftLead: '当前重点是把 #3 机组拉回热电协同最优点，同时保留 #2 深调回旋空间。',
      trader: '今日最关键的是晚峰报价窗口，成本保护线与可调容量已同步更新。',
      plantLeader: '系统正在把生产、市场、深调、碳和风险汇成统一经营动作，而不是分散专题。',
    }[selectedRole];

    return {
      activeRole,
      activeScript,
      activeExplanation,
      metrics,
      highlightedUnits,
      agentCards,
      architecturePillars,
      costDrivers,
      marketWindows,
      deepRegulationCases,
      constraints,
      decisionItems,
      revenueExplainers,
      sandboxPresets,
      revenueTrend,
      marketSensitivity,
      carbonSnapshot,
      carbonTrend,
      scenarioScripts,
      sandboxOutcome,
      sandboxParams,
      selectedPresetId,
      scenarioFeed,
      cockpitSignals,
      quickBrief,
      setRole,
      setActiveScriptId,
      setExplanationId,
      updateSandboxParam,
      applySandboxPreset,
      resetSandbox,
    };
  }, [
    activeScriptId,
    applySandboxPreset,
    explanationId,
    resetSandbox,
    sandboxParams,
    selectedPresetId,
    selectedRole,
    setActiveScriptId,
    setExplanationId,
    setRole,
    updateSandboxParam,
  ]);
}
