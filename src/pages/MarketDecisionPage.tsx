import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Panel from '@/components/Panel';
import SectionTitle from '@/components/SectionTitle';
import { useProfitModel } from '@/hooks/useProfitModel';
import MetricGrid from '@/widgets/MetricGrid';

export default function MarketDecisionPage() {
  const { metrics, revenueTrend, marketWindows, marketSensitivity } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="D. 市场与现货决策中心"
        title="不只是展示价格，而是给出报价建议、依据和风险边界"
        description="页面重点是经营建议而不是数据堆积，帮助市场交易人员在收益、成本与调节边界之间形成更优报价动作。"
      />

      <MetricGrid metrics={metrics.filter((item) => ['spotRevenue', 'marginalRevenue', 'marginalCost', 'riskLoss'].includes(item.id))} />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel eyebrow="现货价格曲线" title="日前 / 日内价格窗口与机会点">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
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
                <Line type="monotone" dataKey="spotPrice" stroke="#46d7ff" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="margin" stroke="#39d98a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="收益敏感性分析" title="不同变量对利润区间的影响">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketSensitivity} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#8da2b5" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#8da2b5"
                  fontSize={12}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0d1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                  }}
                />
                <Bar dataKey="value" fill="#ff9a4d" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel eyebrow="多情景报价建议" title="今日报价策略摘要">
        <div className="grid gap-4 xl:grid-cols-2">
          {marketWindows.map((window) => (
            <div
              key={window.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-medium text-white">{window.period}</div>
                <span className="rounded-full bg-sky/10 px-2 py-1 text-[11px] text-sky ring-1 ring-sky/15">
                  预期利润 {window.expectedMargin} 万元
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-mist">
                <div>参考现货价格：{window.spotPrice} 元/MWh</div>
                <div>
                  建议报价区间：{window.bidRange[0]} - {window.bidRange[1]} 元/MWh
                </div>
                <div>策略建议：{window.recommendation}</div>
              </div>
              <div className="mt-4 rounded-2xl border border-ember/15 bg-ember/10 p-4 text-sm leading-6 text-white">
                风险边界：{window.riskBoundary}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
