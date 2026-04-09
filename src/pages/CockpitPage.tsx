import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Panel from '@/components/Panel';
import SectionTitle from '@/components/SectionTitle';
import { useProfitModel } from '@/hooks/useProfitModel';
import MetricGrid from '@/widgets/MetricGrid';

export default function CockpitPage() {
  const { cockpitSignals, metrics, revenueTrend, decisionItems, highlightedUnits } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="I. 经营驾驶舱 / 管理层视角"
        title="面向厂长、经营负责人和生产副总的经营决策驾驶舱"
        description="这个页面不是普通 BI，而是明确呈现系统如何辅助管理层理解收益达成、风险敞口和重点经营决策。"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {cockpitSignals.map((signal) => {
          const Icon = signal.icon;
          return (
            <Panel key={signal.title}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-mist">{signal.title}</div>
                  <div className="mt-3 text-3xl font-semibold text-white">{signal.value}</div>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10">
                  <Icon className="h-5 w-5 text-sky" />
                </span>
              </div>
              <div className="mt-4 text-sm leading-6 text-mist">{signal.detail}</div>
            </Panel>
          );
        })}
      </div>

      <MetricGrid
        metrics={metrics.filter((item) =>
          ['totalRevenue', 'spotRevenue', 'deepRevenue', 'riskLoss'].includes(item.id),
        )}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="经营达成情况" title="收益、边际空间与风险走势">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="cockpitRevenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#46d7ff" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#46d7ff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="#8da2b5" fontSize={12} />
                <YAxis stroke="#8da2b5" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: '#0d1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#46d7ff" fill="url(#cockpitRevenue)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="risk" stroke="#ff5f6d" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="重点经营决策" title="管理层今日需要盯的动作">
          <div className="space-y-3">
            {decisionItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{item.title}</div>
                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[11px] text-mist ring-1 ring-white/10">
                    {item.impact}
                  </span>
                </div>
                <div className="mt-2 text-xs text-mist">
                  {item.owner} / {item.due}
                </div>
                <div className="mt-2 text-sm leading-6 text-mist">{item.detail}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel eyebrow="机组收益排名" title="当前收益贡献排序与执行状态">
        <div className="grid gap-4 xl:grid-cols-4">
          {highlightedUnits
            .slice()
            .sort((left, right) => right.netContribution - left.netContribution)
            .map((unit, index) => (
              <div
                key={unit.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-xs text-mist">排名 #{index + 1}</div>
                <div className="mt-2 text-lg font-medium text-white">{unit.name}</div>
                <div className="mt-3 text-2xl font-semibold text-white">{unit.netContribution} 万元</div>
                <div className="mt-3 text-sm leading-6 text-mist">{unit.opportunity}</div>
              </div>
            ))}
        </div>
      </Panel>
    </div>
  );
}
