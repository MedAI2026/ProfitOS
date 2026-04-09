import Panel from '@/components/Panel';
import { useProfitModel } from '@/hooks/useProfitModel';

const toneMap = {
  sky: 'from-sky/20 to-sky/5 ring-sky/20',
  mint: 'from-mint/20 to-mint/5 ring-mint/20',
  ember: 'from-ember/20 to-ember/5 ring-ember/20',
  blush: 'from-blush/20 to-blush/5 ring-blush/20',
};

export default function ArchitectureStrip() {
  const { architecturePillars } = useProfitModel();

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {architecturePillars.map((pillar) => (
        <Panel
          key={pillar.id}
          className={`bg-gradient-to-br ${toneMap[pillar.tone]} ring-1`}
          eyebrow={pillar.subtitle}
          title={pillar.title}
        >
          <p className="text-sm leading-6 text-mist">{pillar.description}</p>
          <div className="mt-4 space-y-2">
            {pillar.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white"
              >
                {highlight}
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
