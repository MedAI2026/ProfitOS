import Panel from '@/components/Panel';
import { useProfitModel } from '@/hooks/useProfitModel';

const controls = [
  { key: 'loadDelta', label: '负荷变化', unit: '%', min: -10, max: 10 },
  { key: 'coalPriceDelta', label: '煤价变化', unit: '元/吨', min: -10, max: 12 },
  { key: 'heatLoadDelta', label: '热负荷变化', unit: '%', min: -10, max: 10 },
  { key: 'spotPriceDelta', label: '现货价格变化', unit: '元/MWh', min: -10, max: 10 },
  { key: 'deepRegulationDelta', label: '深调程度变化', unit: '档', min: -6, max: 6 },
  { key: 'carbonPriceDelta', label: '碳价变化', unit: '元/吨', min: -10, max: 10 },
] as const;

export default function SandboxControls() {
  const {
    sandboxParams,
    sandboxPresets,
    selectedPresetId,
    updateSandboxParam,
    applySandboxPreset,
    resetSandbox,
  } = useProfitModel();

  return (
    <Panel
      eyebrow="Twin Sandbox"
      title="经营推演参数"
      aside={
        <button
          type="button"
          onClick={resetSandbox}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist hover:border-white/20 hover:text-white"
        >
          重置参数
        </button>
      }
    >
      <div className="space-y-5">
        {controls.map((control) => {
          const value = sandboxParams[control.key];
          return (
            <div key={control.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-white">{control.label}</div>
                  <div className="mt-1 text-xs text-mist">
                    当前调节值 {value > 0 ? '+' : ''}
                    {value} {control.unit}
                  </div>
                </div>
                <div className="text-xs text-mist">
                  {control.min} ~ {control.max}
                </div>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                value={value}
                onChange={(event) =>
                  updateSandboxParam(control.key, Number(event.target.value))
                }
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#46d7ff]"
              />
            </div>
          );
        })}

        <div>
          <div className="mb-3 text-sm font-medium text-white">情景卡片</div>
          <div className="grid gap-3">
            {sandboxPresets.map((preset) => {
              const active = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applySandboxPreset(preset.id, preset.params)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? 'border-sky/25 bg-sky/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-white">{preset.title}</div>
                    <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[11px] text-mist ring-1 ring-white/10">
                      {preset.focus}
                    </span>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-mist">{preset.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}
