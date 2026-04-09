import { NavLink, useNavigate } from 'react-router-dom';
import { CalendarDays, LogOut, Sparkles, UserRound } from 'lucide-react';
import { navigationItems } from '@/mock/profitData';
import RoleSwitcher from '@/components/RoleSwitcher';
import { useProfitModel } from '@/hooks/useProfitModel';
import { useAuthStore } from '@/store/useAuthStore';

export default function TopBar() {
  const navigate = useNavigate();
  const { activeRole, activeScript, quickBrief } = useProfitModel();
  const displayName = useAuthStore((state) => state.displayName);
  const title = useAuthStore((state) => state.title);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const now = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'long',
  }).format(new Date());

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="label mb-2">收益操作系统</p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">ProfitOS 总收益中枢</h2>
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-mist ring-1 ring-white/10">
              当前视角：{activeRole.name}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-mist">{quickBrief}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mist">
            <CalendarDays className="h-4 w-4 text-sky" />
            {now}
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky/10">
              <UserRound className="h-4 w-4 text-sky" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{displayName}</div>
              <div className="truncate text-xs text-mist">
                {title} · {username}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/login', { replace: true });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-mist transition hover:border-white/20 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              退出
            </button>
          </div>
        </div>
      </div>

      <RoleSwitcher />

      <div className="surface-soft flex flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky/10">
            <Sparkles className="h-[18px] w-[18px] text-sky" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">
              {activeScript ? `当前协同剧本：${activeScript.title}` : '今日系统摘要'}
            </p>
            <p className="mt-1 text-sm leading-6 text-mist">
              {activeScript
                ? `${activeScript.trigger} 系统已联动多智能体形成经营动作。`
                : 'Power Graph、Twin Sandbox 与 Agent Runtime 正围绕同一收益目标持续协同。'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {navigationItems.slice(0, 3).map((item) => (
            <span
              key={item.path}
              className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-mist ring-1 ring-white/10"
            >
              {item.shortLabel}
            </span>
          ))}
        </div>
      </div>

      <div className="surface-soft flex gap-2 overflow-x-auto p-2 lg:hidden">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-2xl px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-sky/15 text-white ring-1 ring-sky/25'
                  : 'bg-white/[0.03] text-mist hover:bg-white/[0.05] hover:text-white'
              }`
            }
          >
            {item.shortLabel}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
