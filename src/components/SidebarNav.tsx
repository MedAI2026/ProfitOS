import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/mock/profitData';

export default function SidebarNav() {
  return (
    <aside className="hidden h-screen border-r border-white/10 bg-[#081423]/85 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-8 px-3">
        <p className="label mb-2">ProfitOS Demo</p>
        <h1 className="text-2xl font-semibold text-white">电厂生产经营收益操作系统</h1>
        <p className="mt-3 text-sm leading-6 text-mist">
          不是统计利润，而是帮助你决定下一步怎样更赚钱、更稳、更可执行。
        </p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group block rounded-2xl border px-4 py-3 transition ${
                  isActive
                    ? 'border-sky/25 bg-sky/10 text-white'
                    : 'border-white/5 bg-white/[0.02] text-mist hover:border-white/10 hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04]">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="mt-1 text-xs leading-5 text-mist">{item.description}</div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
