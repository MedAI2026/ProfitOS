import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Panel from '@/components/Panel';
import SectionTitle from '@/components/SectionTitle';
import { useProfitModel } from '@/hooks/useProfitModel';
import SandboxControls from '@/modules/SandboxControls';
import { formatNumber } from '@/utils/format';

export default function SandboxPage() {
  const { sandboxOutcome, selectedPresetId } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="G. Twin Sandbox 经营仿真沙盘"
        title="ProfitOS 的重点不是看历史，而是推演未来"
        description="通过滑块、情景卡片和多变量联动，模拟不同条件下的收益、成本、碳和风险变化，并给出推荐最优方案。"
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SandboxControls />

        <Panel
          eyebrow={selectedPresetId ? '已加载情景卡片' : '自定义参数推演'}
          title="经营推演结果"
          className="bg-gradient-to-br from-sky/10 to-emerald-400/5"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm text-mist">收益变化</div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {formatNumber(sandboxOutcome.totalRevenue)} 万元
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm text-mist">成本变化</div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {formatNumber(sandboxOutcome.totalCost)} 万元
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm text-mist">碳变化</div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {formatNumber(sandboxOutcome.carbonImpact)} 万元
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm text-mist">风险变化</div>
              <div className="mt-3 text-2xl font-semibold text-white">
                {formatNumber(sandboxOutcome.riskIndex)} 分
              </div>
            </div>
          </div>

          <div className="mt-6 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sandboxOutcome.contributionSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#8da2b5" fontSize={12} />
                <YAxis stroke="#8da2b5" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: '#0d1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                  }}
                />
                <Legend />
                <Bar dataKey="base" fill="#2f4c6b" radius={[8, 8, 0, 0]} name="基线" />
                <Bar dataKey="scenario" fill="#46d7ff" radius={[8, 8, 0, 0]} name="推演方案" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/10 p-5">
              <div className="text-sm text-mint">推荐最优方案</div>
              <div className="mt-3 text-lg font-medium text-white">
                {sandboxOutcome.recommendedStrategy}
              </div>
              <div className="mt-3 text-sm leading-6 text-mist">
                当前边际价差约为 {formatNumber(sandboxOutcome.marginalSpread, 3)} 元/kWh。
              </div>
            </div>
            <div className="grid gap-3">
              {sandboxOutcome.actionBullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
