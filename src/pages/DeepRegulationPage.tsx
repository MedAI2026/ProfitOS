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
import { formatNumber } from '@/utils/format';

export default function DeepRegulationPage() {
  const { deepRegulationCases, constraints } = useProfitModel();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="E. 深调收益分析中心"
        title="深调不是单纯执行调度，而是收益机会与设备约束的平衡"
        description="系统在这里明确回答：为什么建议这样深调，收益增加了多少，风险和能耗代价是否可接受。"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {deepRegulationCases.map((item) => (
          <Panel key={item.id} title={item.label}>
            <div className="text-3xl font-semibold text-white">
              {formatNumber(item.incrementalRevenue)} <span className="text-sm text-mist">万元</span>
            </div>
            <div className="mt-3 text-sm text-mist">补偿 {item.compensation} 元/MWh</div>
            <div className="mt-2 text-sm text-mist">能耗代价 {item.energyPenalty}</div>
            <div className="mt-2 text-sm text-sky">{item.recommendedRange}</div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="深调前后对比" title="基础工况 vs 深调工况收益与代价">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deepRegulationCases}>
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
                <Legend />
                <Bar dataKey="incrementalRevenue" fill="#39d98a" radius={[8, 8, 0, 0]} name="增量收益" />
                <Bar dataKey="energyPenalty" fill="#ff9a4d" radius={[8, 8, 0, 0]} name="能耗代价" />
                <Bar dataKey="equipmentStress" fill="#ff5f6d" radius={[8, 8, 0, 0]} name="设备应力" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel eyebrow="推荐区间" title="为什么系统建议这样深调">
          <div className="space-y-3">
            <div className="rounded-2xl border border-sky/15 bg-sky/10 p-4">
              <div className="font-medium text-white">当前推荐：中度深调 260-280MW</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                该区间可以同时保持较高补偿收益和较低设备应力，是当前补偿价下的最佳平衡点。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">收益变化说明</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                当补偿价超过 78 元/MWh 时，深度调峰开始优于轻度深调；低于该阈值则更适合稳态运行。
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-medium text-white">设备约束提示</div>
              <div className="mt-2 text-sm leading-6 text-mist">
                #2 机组一次风机振动预警意味着不宜长时间保持极限深调，系统已自动降权该方案。
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <Panel eyebrow="设备与经营边界" title="深调收益 / 风险平衡分析">
        <div className="grid gap-4 xl:grid-cols-2">
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
  );
}
