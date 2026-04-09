import Panel from '@/components/Panel';
import StatusBadge from '@/components/StatusBadge';
import { UnitSnapshot } from '@/types/domain';
import { formatNumber } from '@/utils/format';

interface UnitCardProps {
  unit: UnitSnapshot;
}

export default function UnitCard({ unit }: UnitCardProps) {
  const progress = Math.max(0, Math.min(100, (unit.currentLoadMw / unit.capacityMw) * 100));
  const optimalCenter = (unit.optimalLoadRange[0] + unit.optimalLoadRange[1]) / 2;
  const deviation = unit.currentLoadMw - optimalCenter;

  return (
    <Panel
      className="h-full"
      eyebrow={unit.type}
      title={unit.name}
      aside={<StatusBadge kind="unit" status={unit.status} />}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-mist">当前负荷</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {formatNumber(unit.currentLoadMw)} <span className="text-sm text-mist">MW</span>
              </p>
            </div>
            <div className="text-right text-sm text-mist">
              <div>最优区间</div>
              <div className="mt-1 text-white">
                {unit.optimalLoadRange[0]} - {unit.optimalLoadRange[1]} MW
              </div>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/[0.05]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky to-mint"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-mist">
            相对最优点偏移 {deviation > 0 ? '+' : ''}
            {formatNumber(deviation)} MW
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/[0.03] p-3">
            <div className="text-xs text-mist">边际成本</div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(unit.marginalCost, 3)} 元/kWh
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.03] p-3">
            <div className="text-xs text-mist">边际收益</div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(unit.marginalRevenue, 3)} 元/kWh
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.03] p-3">
            <div className="text-xs text-mist">净收益贡献</div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(unit.netContribution)} 万元
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-mist">
          <p>调节弹性：{unit.dispatchFlexibility}</p>
          <p>当前约束：{unit.constraint}</p>
          <p className="text-sky">经营机会：{unit.opportunity}</p>
        </div>
      </div>
    </Panel>
  );
}
