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
import { formatNumber } from '@/utils/format';

export default function CostWorkbenchPage() {
  const { costDrivers, revenueTrend, highlightedUnits, constraints } = useProfitModel();

  const unitCostCompare = highlightedUnits.map((unit) => ({
    name: unit.name,
    marginalCost: unit.marginalCost,
    marginalRevenue: unit.marginalRevenue,
  }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="B. 实时成本工作台"
        title="成本不是月报口径，而是运行态与工况态共同变化的实时变量"
        description="这里把煤价、煤耗、边际煤价、热电成本分摊和辅耗拉到同一工作台里，用来解释成本变化原因和经营影响。"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {costDrivers.map((driver) => (
          <Panel key={driver.id} title={driver.title}>
            <div className="text-3xl font-semibold text-white">
              {formatNumber(driver.value, driver.unit.includes('元/kWh') ? 3 : 1)}
              <span className="ml-2 text-sm text-mist">{driver.unit}</span>
            </div>
            <div className="mt-3 text-sm text-mist">
              变化 {driver.change > 0 ? '+' : ''}
              {formatNumber(driver.change)}
            </div>
            <div className="mt-4 text-sm leading-6 text-mist">{driver.reason}</div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel eyebrow="单位发电成本趋势" title="成本随负荷、煤耗与时段联动变化">
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
                <Line type="monotone" dataKey="cost" stroke="#ff9a4d" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="load" stroke="#46d7ff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="机组成本对比" title="当前负荷区间下的边际成本与边际收益">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitCostCompare}>
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
                <Bar dataKey="marginalCost" fill="#ff9a4d" radius={[8, 8, 0, 0]} />
                <Bar dataKey="marginalRevenue" fill="#46d7ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel eyebrow="成本异常解释" title="系统正在解释 #1 机组度电成本上升原因">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">原因一：边际煤价抬升</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                外购补煤拉高了边际煤价，高于长协煤的部分直接映射到新增出力成本。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">原因二：供热带动热电分摊变化</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                #3 机组供热负荷上行，导致热电成本重新分摊，全厂边际排序发生偏移。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">原因三：深调工况下附加能耗增加</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                深调准备态会抬升辅机和锅炉侧附加能耗，低负荷区间成本曲线更陡。
              </div>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="约束映射" title="成本变化已被映射到经营约束">
          <div className="space-y-3">
            {constraints.map((constraint) => (
              <div
                key={constraint.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{constraint.name}</div>
                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[11px] text-mist ring-1 ring-white/10">
                    {constraint.scope}
                  </span>
                </div>
                <div className="mt-2 text-sm leading-6 text-mist">{constraint.impact}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
