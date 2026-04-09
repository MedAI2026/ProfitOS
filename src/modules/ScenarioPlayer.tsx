import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Panel from '@/components/Panel';
import StatusBadge from '@/components/StatusBadge';
import { useProfitModel } from '@/hooks/useProfitModel';
import { formatNumber } from '@/utils/format';

export default function ScenarioPlayer() {
  const { activeScript, scenarioScripts, setActiveScriptId } = useProfitModel();
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [activeScript?.id]);

  useEffect(() => {
    if (!playing || !activeScript) {
      return;
    }

    if (stepIndex >= activeScript.steps.length - 1) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStepIndex((current) => current + 1);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [activeScript, playing, stepIndex]);

  const chartData = activeScript
    ? [
        { name: '剧本前', revenue: activeScript.beforeRevenue },
        { name: '剧本后', revenue: activeScript.afterRevenue },
      ]
    : [];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Panel eyebrow="协同剧本" title="可点击演示的经营联动场景">
        <div className="space-y-3">
          {scenarioScripts.map((script) => {
            const active = activeScript?.id === script.id;
            return (
              <button
                key={script.id}
                type="button"
                onClick={() => setActiveScriptId(script.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-sky/30 bg-sky/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{script.title}</div>
                  {active ? <StatusBadge kind="agent" status="running" /> : null}
                </div>
                <div className="mt-2 text-sm leading-6 text-mist">{script.summary}</div>
                <div className="mt-3 text-xs text-mist">触发原因：{script.trigger}</div>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel
        eyebrow="Agent Runtime"
        title={activeScript ? activeScript.title : '选择一个协同剧本'}
        aside={
          activeScript ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="rounded-full bg-sky/15 px-3 py-1 text-xs text-sky ring-1 ring-sky/25 hover:bg-sky/20"
              >
                自动演示
              </button>
              <button
                type="button"
                onClick={() => setActiveScriptId(null)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist hover:border-white/20 hover:text-white"
              >
                清除
              </button>
            </div>
          ) : null
        }
      >
        {activeScript ? (
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm text-mist">分析过程摘要</div>
                <div className="mt-4 space-y-3">
                  {activeScript.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`rounded-2xl border p-4 transition ${
                        index <= stepIndex
                          ? 'border-sky/20 bg-sky/10'
                          : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <div className="text-sm font-medium text-white">{step.actor}</div>
                      <div className="mt-2 text-sm leading-6 text-mist">{step.summary}</div>
                      <div className="mt-2 text-xs text-sky">{step.effect}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-mist">收益变化对比</div>
                  <div className="mt-4 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#8da2b5" fontSize={12} />
                        <YAxis stroke="#8da2b5" fontSize={12} />
                        <Bar dataKey="revenue" fill="#46d7ff" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 text-sm text-mist">
                    剧本后预计总收益：
                    <span className="ml-2 font-medium text-white">
                      {formatNumber(activeScript.afterRevenue)} 万元
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-4">
                  <div className="text-sm text-mint">建议结果</div>
                  <div className="mt-2 text-sm leading-6 text-white">{activeScript.outcome}</div>
                  <div className="mt-3 space-y-2">
                    {activeScript.actions.map((action) => (
                      <div
                        key={action}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white"
                      >
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-mist">
                  风险边界：<span className="text-white">{activeScript.riskBoundary}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-8 text-sm leading-7 text-mist">
            选择左侧任一剧本后，可以展示触发原因、分析步骤、建议结果，以及收益变化的前后对比。
          </div>
        )}
      </Panel>
    </div>
  );
}
