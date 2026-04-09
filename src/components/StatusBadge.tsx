import { AlertTriangle, Eye, LucideIcon, Play, ShieldCheck } from 'lucide-react';
import { AgentStatus, UnitStatus } from '@/types/domain';

const unitConfig: Record<UnitStatus, { label: string; className: string; icon: LucideIcon }> =
  {
    optimal: {
      label: '最优区间',
      className: 'bg-mint/10 text-mint ring-mint/20',
      icon: ShieldCheck,
    },
    watch: {
      label: '观察中',
      className: 'bg-ember/10 text-ember ring-ember/20',
      icon: Eye,
    },
    constrained: {
      label: '约束中',
      className: 'bg-blush/10 text-blush ring-blush/20',
      icon: AlertTriangle,
    },
  };

const agentConfig: Record<AgentStatus, { label: string; className: string; icon: LucideIcon }> =
  {
    running: {
      label: '协同运行',
      className: 'bg-sky/10 text-sky ring-sky/20',
      icon: Play,
    },
    watching: {
      label: '待联动',
      className: 'bg-ember/10 text-ember ring-ember/20',
      icon: Eye,
    },
    warning: {
      label: '需关注',
      className: 'bg-blush/10 text-blush ring-blush/20',
      icon: AlertTriangle,
    },
  };

interface StatusBadgeProps {
  kind: 'unit' | 'agent';
  status: UnitStatus | AgentStatus;
}

export default function StatusBadge({ kind, status }: StatusBadgeProps) {
  const config =
    kind === 'unit'
      ? unitConfig[status as UnitStatus]
      : agentConfig[status as AgentStatus];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
