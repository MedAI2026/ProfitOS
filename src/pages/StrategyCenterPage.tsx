import Panel from '@/components/Panel';
import SectionTitle from '@/components/SectionTitle';
import { useProfitModel } from '@/hooks/useProfitModel';
import AgentMatrix from '@/modules/AgentMatrix';
import ScenarioPlayer from '@/modules/ScenarioPlayer';

export default function StrategyCenterPage() {
  const { scenarioFeed } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="H. 智能体策略中心"
        title="ProfitOS 不是一个计算器，而是一组经营智能体在协同工作"
        description="这里集中展示成本、负荷、市场、深调、碳资产和收益协调智能体如何协同产出策略，并提供 3 个可点击演示剧本。"
      />

      <ScenarioPlayer />

      <Panel eyebrow="Multi-Agent Matrix" title="经营智能体运行矩阵">
        <AgentMatrix />
      </Panel>

      <Panel eyebrow="Coordination Feed" title="智能体协同运行时序">
        <div className="grid gap-4 xl:grid-cols-3">
          {scenarioFeed.map((item) => (
            <div
              key={item.time}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="text-xs text-mist">{item.time}</div>
              <div className="mt-2 text-base font-medium text-white">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-mist">{item.detail}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
