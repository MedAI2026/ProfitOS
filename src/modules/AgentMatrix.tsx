import Panel from '@/components/Panel';
import StatusBadge from '@/components/StatusBadge';
import { useProfitModel } from '@/hooks/useProfitModel';
import { formatPercent } from '@/utils/format';

interface AgentMatrixProps {
  limit?: number;
}

export default function AgentMatrix({ limit }: AgentMatrixProps) {
  const { agentCards } = useProfitModel();
  const displayAgents = limit ? agentCards.slice(0, limit) : agentCards;

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {displayAgents.map((agent) => (
        <Panel
          key={agent.id}
          className="h-full"
          eyebrow={agent.domain}
          title={agent.name}
          aside={<StatusBadge kind="agent" status={agent.status} />}
        >
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.03] p-3">
                <div className="text-xs text-mist">置信度</div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {formatPercent(agent.confidence * 100)}
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.03] p-3">
                <div className="text-xs text-mist">触发来源</div>
                <div className="mt-2 text-sm leading-6 text-white">{agent.triggerSource}</div>
              </div>
            </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs text-mist">当前分析对象</div>
              <div className="mt-2 text-sm leading-6 text-white">{agent.currentFocus}</div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <div className="text-xs text-mist">最近输出</div>
                <div className="mt-2 text-sm leading-6 text-white">{agent.latestOutput}</div>
              </div>
              <div className="rounded-2xl bg-sky/10 p-4 ring-1 ring-sky/15">
                <div className="text-xs text-sky">推荐动作</div>
                <div className="mt-2 text-sm leading-6 text-white">{agent.recommendedAction}</div>
              </div>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
}
