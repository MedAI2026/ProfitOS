import {
  Area,
  AreaChart,
  Bar,
  BarChart,
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
import { formatNumber } from '@/utils/format';

export default function RevenueOverviewPage() {
  const {
    metrics,
    highlightedUnits,
    revenueTrend,
    revenueExplainers,
    activeExplanation,
    setExplanationId,
  } = useProfitModel();

  const unitContribution = highlightedUnits.map((unit) => ({
    name: unit.name,
    contribution: unit.netContribution,
  }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="A. 收益总览中心"
        title="实时动态收益不是一个数字，而是一组经营动作的结果"
        description="围绕总收益、边际收益、构成贡献和波动原因，把“看见利润”升级为“理解为什么变动以及下一步怎么做”。"
      />

      <MetricGrid
        metrics={metrics}
        onSelect={(metric) => {
          setExplanationId(metric.id);
        }}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel eyebrow="收益波动趋势" title="今日收益 / 成本 / 边际空间">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#39d98a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#39d98a" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="costFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#ff9a4d" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#ff9a4d" stopOpacity={0.02} />
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
                <Area type="monotone" dataKey="revenue" stroke="#39d98a" fill="url(#revenueFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="cost" stroke="#ff9a4d" fill="url(#costFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="机组收益贡献" title="各机组对总收益的贡献">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitContribution} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#8da2b5" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#8da2b5"
                  fontSize={12}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0d1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                  }}
                />
                <Bar dataKey="contribution" fill="#46d7ff" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel eyebrow="收益变化解释" title="系统正在解释收益为什么变化">
          <div className="rounded-3xl border border-sky/15 bg-sky/10 p-5">
            <div className="text-sm text-sky">当前选中收益解释</div>
            <div className="mt-3 text-base leading-7 text-white">{activeExplanation}</div>
          </div>
          <div className="mt-4 space-y-3">
            {revenueExplainers.map((item) => (
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
                <div className="mt-2 text-sm leading-6 text-mist">{item.detail}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="边际空间" title="收益空间与风险损失并行观察">
          <div className="grid gap-4 md:grid-cols-2">
            {highlightedUnits.map((unit) => (
              <div
                key={unit.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-base font-medium text-white">{unit.name}</div>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-mist">
                  <span>边际收益</span>
                  <span className="text-white">{formatNumber(unit.marginalRevenue, 3)} 元/kWh</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-mist">
                  <span>边际成本</span>
                  <span className="text-white">{formatNumber(unit.marginalCost, 3)} 元/kWh</span>
                </div>
                <div className="mt-3 text-sm leading-6 text-sky">{unit.opportunity}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
