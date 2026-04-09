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
import { formatNumber } from '@/utils/format';

export default function CarbonCenterPage() {
  const { carbonSnapshot, carbonTrend, highlightedUnits } = useProfitModel();

  const intensityCompare = highlightedUnits.map((unit) => ({
    name: unit.name,
    intensity: unit.carbonIntensity,
  }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="F. 碳资产与双碳收益中心"
        title="碳不是附属指标，而是经营变量"
        description="这里用经营语言展示碳配额、碳成本、碳收益与机组组合之间的关系，让客户看到“碳资产运营”的系统形态。"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel title="实时碳价">
          <div className="text-3xl font-semibold text-white">
            {carbonSnapshot.carbonPrice}
            <span className="ml-2 text-sm text-mist">元/吨</span>
          </div>
        </Panel>
        <Panel title="碳配额消耗">
          <div className="text-3xl font-semibold text-white">
            {formatNumber(carbonSnapshot.quotaUsedPct)}%
          </div>
        </Panel>
        <Panel title="日碳排估算">
          <div className="text-3xl font-semibold text-white">
            {formatNumber(carbonSnapshot.dailyEmission)}
            <span className="ml-2 text-sm text-mist">吨</span>
          </div>
        </Panel>
        <Panel title="碳收益 / 成本">
          <div className="text-3xl font-semibold text-white">
            {formatNumber(carbonSnapshot.carbonRevenue)}
            <span className="ml-2 text-sm text-mist">万元</span>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel eyebrow="碳收益趋势" title="碳收益与碳强度变化">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonTrend}>
                <defs>
                  <linearGradient id="carbonFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#39d98a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#39d98a" stopOpacity={0.03} />
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
                <Area type="monotone" dataKey="carbon" stroke="#39d98a" fill="url(#carbonFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="碳排强度对比" title="不同工况下碳强度变化">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intensityCompare}>
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
                <Bar dataKey="intensity" fill="#46d7ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel eyebrow="智能建议" title="在当前碳价条件下的优先策略">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-medium text-white">策略一：高效率机组优先承接增发</div>
            <div className="mt-2 text-sm leading-6 text-mist">
              用更低碳强度机组吃下现货窗口，可以同时扩大现货收益和碳收益。
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-medium text-white">策略二：供热机组避免高碳高成本波动</div>
            <div className="mt-2 text-sm leading-6 text-mist">
              在热负荷高位时，通过保持 #4 机组稳定出力降低整体碳强度。
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-medium text-white">策略三：把碳约束写入报价边界</div>
            <div className="mt-2 text-sm leading-6 text-mist">
              当碳价继续上行时，报价策略不再只看煤价和现货价，还要看碳收益保护线。
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
