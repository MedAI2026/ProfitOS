import {
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
import UnitCard from '@/widgets/UnitCard';

export default function LoadWorkbenchPage() {
  const { highlightedUnits, constraints } = useProfitModel();

  const loadCompareData = highlightedUnits.map((unit) => ({
    name: unit.name,
    current: unit.currentLoadMw,
    optimal: (unit.optimalLoadRange[0] + unit.optimalLoadRange[1]) / 2,
    heat: unit.heatLoadTph,
  }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="C. 机组负荷与工况收益工作台"
        title="负荷决策的目标不是平稳，而是收益导向的最优工况"
        description="这里把机组负荷、供热约束、设备风险和收益最优点放在一起，帮助值长判断当前是否处于最优经营工况。"
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {highlightedUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel eyebrow="收益负荷区间" title="当前负荷 vs 最优收益点">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadCompareData}>
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
                <Bar dataKey="current" fill="#46d7ff" radius={[8, 8, 0, 0]} />
                <Bar dataKey="optimal" fill="#39d98a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="热电联动" title="热负荷与电负荷联动关系">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadCompareData}>
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
                <Bar dataKey="current" fill="#46d7ff" radius={[8, 8, 0, 0]} />
                <Bar dataKey="heat" fill="#ff9a4d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel eyebrow="当前工况偏离收益最优点" title="系统建议负荷策略">
          <div className="space-y-3">
            <div className="rounded-2xl border border-sky/15 bg-sky/10 p-4">
              <div className="font-medium text-white">建议一：#3 机组回调 6MW</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                在供热不受影响条件下，回调后可以减少高成本暴露并回到更优热电比区间。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">建议二：由 #1 机组承接现货机会增发</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                #1 机组仍处于收益最优区间，并具备更好的碳与煤耗表现。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">建议三：#2 机组保留深调回旋空间</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                避免被短时追价策略占满调节边界，保留更高价值的深调机会。
              </div>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="设备风险映射" title="设备风险如何影响运行策略">
          <div className="space-y-3">
            {constraints.map((constraint) => (
              <div
                key={constraint.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="font-medium text-white">{constraint.name}</div>
                <div className="mt-2 text-sm leading-6 text-mist">{constraint.impact}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
