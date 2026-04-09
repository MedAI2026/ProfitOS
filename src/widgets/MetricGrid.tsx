import MetricCard from '@/components/MetricCard';
import { SummaryMetric } from '@/types/domain';

interface MetricGridProps {
  metrics: SummaryMetric[];
  onSelect?: (metric: SummaryMetric) => void;
}

export default function MetricGrid({ metrics, onSelect }: MetricGridProps) {
  return (
    <div className="grid-shell sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          onClick={onSelect ? () => onSelect(metric) : undefined}
        />
      ))}
    </div>
  );
}
