import { roleProfiles } from '@/mock/profitData';
import { useProfitModel } from '@/hooks/useProfitModel';

export default function RoleSwitcher() {
  const { activeRole, setRole } = useProfitModel();

  return (
    <div className="surface-soft flex flex-wrap gap-2 p-2">
      {roleProfiles.map((role) => {
        const active = role.id === activeRole.id;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => setRole(role.id)}
            className={`rounded-2xl px-3 py-2 text-left text-sm transition ${
              active
                ? 'bg-sky/15 text-white ring-1 ring-sky/30'
                : 'bg-white/[0.02] text-mist hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <div className="font-medium">{role.name}</div>
            <div className="mt-1 text-xs text-mist">{role.tagline}</div>
          </button>
        );
      })}
    </div>
  );
}
