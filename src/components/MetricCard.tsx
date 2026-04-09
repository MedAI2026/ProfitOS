import { ArrowRight } from 'lucide-react';
import { SummaryMetric } from '@/types/domain';
import { formatNumber } from '@/utils/format';
import TrendPill from '@/components/TrendPill';

const toneClasses = {
  sky: 'from-sky/15 to-sky/5 ring-sky/15',
  mint: 'from-mint/15 to-mint/5 ring-mint/15',
  ember: 'from-ember/15 to-ember/5 ring-ember/15',
  blush: 'from-blush/15 to-blush/5 ring-blush/15',
};

interface MetricCardProps {
  metric: SummaryMetric;
  onClick?: () => void;
}

export default function MetricCard({ metric, onClick }: MetricCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`surface-soft group flex h-full w-full flex-col gap-4 bg-gradient-to-br p-4 text-left ring-1 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] ${toneClasses[metric.tone]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-mist">{metric.title}</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-semibold text-white sm:text-3xl">
              {formatNumber(metric.value, metric.unit === '元/kWh' ? 3 : 1)}
            </span>
            <span className="pb-1 text-sm text-mist">{metric.unit}</span>
          </div>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 text-mist transition group-hover:text-white" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <TrendPill
          value={metric.delta}
          suffix={metric.unit === '元/kWh' ? ` ${metric.unit}` : ` ${metric.unit}`}
        />
        <span className="text-xs text-mist">{metric.deltaLabel}</span>
      </div>
      <p className="text-sm leading-6 text-mist">{metric.description}</p>
    </button>
  );
}
