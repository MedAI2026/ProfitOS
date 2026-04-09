import { create } from 'zustand';
import { RoleId, SandboxParams } from '@/types/domain';

export const defaultSandboxParams: SandboxParams = {
  loadDelta: 0,
  coalPriceDelta: 0,
  heatLoadDelta: 0,
  spotPriceDelta: 0,
  deepRegulationDelta: 0,
  carbonPriceDelta: 0,
};

interface ProfitStore {
  selectedRole: RoleId;
  activeScriptId: string | null;
  explanationId: string | null;
  sandboxParams: SandboxParams;
  selectedPresetId: string | null;
  setRole: (role: RoleId) => void;
  setActiveScriptId: (id: string | null) => void;
  setExplanationId: (id: string | null) => void;
  updateSandboxParam: (key: keyof SandboxParams, value: number) => void;
  applySandboxPreset: (presetId: string, params: SandboxParams) => void;
  resetSandbox: () => void;
}

export const useProfitStore = create<ProfitStore>((set) => ({
  selectedRole: 'opsLead',
  activeScriptId: null,
  explanationId: null,
  sandboxParams: defaultSandboxParams,
  selectedPresetId: null,
  setRole: (selectedRole) => set({ selectedRole }),
  setActiveScriptId: (activeScriptId) => set({ activeScriptId }),
  setExplanationId: (explanationId) => set({ explanationId }),
  updateSandboxParam: (key, value) =>
    set((state) => ({
      selectedPresetId: null,
      sandboxParams: {
        ...state.sandboxParams,
        [key]: value,
      },
    })),
  applySandboxPreset: (selectedPresetId, sandboxParams) =>
    set({
      selectedPresetId,
      sandboxParams,
    }),
  resetSandbox: () =>
    set({
      selectedPresetId: null,
      sandboxParams: defaultSandboxParams,
    }),
}));
