import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Trend } from '@/types/domain';
import { formatSigned } from '@/utils/format';

const trendMap = {
  up: {
    icon: ArrowUpRight,
    className: 'text-mint bg-mint/10 ring-mint/25',
  },
  down: {
    icon: ArrowDownRight,
    className: 'text-blush bg-blush/10 ring-blush/25',
  },
  stable: {
    icon: ArrowRight,
    className: 'text-mist bg-white/5 ring-white/10',
  },
};

interface TrendPillProps {
  value: number;
  suffix?: string;
}

export default function TrendPill({ value, suffix = '' }: TrendPillProps) {
  const trend: Trend = value > 0 ? 'up' : value < 0 ? 'down' : 'stable';
  const config = trendMap[trend];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {formatSigned(value)}
      {suffix}
    </span>
  );
}
