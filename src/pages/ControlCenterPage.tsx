import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Panel from '@/components/Panel';
import SectionTitle from '@/components/SectionTitle';
import { useProfitModel } from '@/hooks/useProfitModel';
import AgentMatrix from '@/modules/AgentMatrix';
import ArchitectureStrip from '@/modules/ArchitectureStrip';
import MetricGrid from '@/widgets/MetricGrid';
import { navigationItems } from '@/mock/profitData';

export default function ControlCenterPage() {
  const { activeRole, metrics, decisionItems, scenarioFeed } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Home / 总控入口"
        title="ProfitOS 总收益中枢"
        description="这里不是利润统计页，而是围绕成本、负荷、市场、深调、碳与风险联动生成经营动作的决策中枢。"
      />

      <Panel className="bg-gradient-to-br from-sky/10 via-transparent to-emerald-400/5">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="label mb-3">今日经营总览</p>
            <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-white">
              {activeRole.heroFocus}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-mist">
              ProfitOS 把生产、经营、现货、深调和碳放到同一条收益主线上，系统的核心输出不是报表，而是可执行的经营策略、情景判断和协同动作。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeRole.priorities.map((priority) => (
                <span
                  key={priority}
                  className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-mist ring-1 ring-white/10"
                >
                  {priority}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.slice(0, 4).map((metric) => (
              <div
                key={metric.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="text-sm text-mist">{metric.title}</div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {metric.value.toFixed(metric.unit === '元/kWh' ? 3 : 1)} {metric.unit}
                </div>
                <div className="mt-3 text-xs leading-6 text-mist">{metric.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <MetricGrid metrics={metrics} />

      <div className="space-y-4">
        <SectionTitle
          eyebrow="Shared Architecture"
          title="PowerOS 共享底座能力"
          description="通过 UI 明确展示 Power Graph、Twin Sandbox 和 Agent Runtime 是 ProfitOS 的统一底层能力。"
        />
        <ArchitectureStrip />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="工作台入口" title="核心工作台快速进入">
          <div className="grid gap-4 md:grid-cols-2">
            {navigationItems.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky/20 hover:bg-sky/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-medium text-white">{item.label}</div>
                    <div className="mt-2 text-sm leading-6 text-mist">{item.description}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-mist transition group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Today Actions" title="今日重点经营决策事项">
          <div className="space-y-3">
            {decisionItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white">{item.title}</div>
                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[11px] text-mist ring-1 ring-white/10">
                    {item.impact}
                  </span>
                </div>
                <div className="mt-2 text-xs text-mist">
                  Owner: {item.owner} / 截止 {item.due}
                </div>
                <div className="mt-3 text-sm leading-6 text-mist">{item.detail}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="Agent Summary" title="智能体策略摘要">
          <AgentMatrix limit={4} />
        </Panel>

        <Panel eyebrow="Decision Flow" title="今日经营协同流转">
          <div className="space-y-4">
            {scenarioFeed.map((item) => (
              <div key={item.time} className="relative pl-6">
                <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-sky" />
                <div className="text-xs text-mist">{item.time}</div>
                <div className="mt-1 text-base font-medium text-white">{item.title}</div>
                <div className="mt-1 text-sm leading-6 text-mist">{item.detail}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
