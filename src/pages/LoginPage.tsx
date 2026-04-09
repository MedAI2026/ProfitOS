import { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  LockKeyhole,
  Orbit,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import Panel from '@/components/Panel';
import { roleProfiles, summaryMetrics } from '@/mock/profitData';
import { useProfitStore } from '@/store/useProfitStore';
import { demoCredentials, useAuthStore } from '@/store/useAuthStore';
import { formatNumber } from '@/utils/format';
import { RoleId } from '@/types/domain';

interface LoginLocationState {
  from?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setRole = useProfitStore((state) => state.setRole);
  const login = useAuthStore((state) => state.login);

  const locationState = (location.state as LoginLocationState | null) ?? null;
  const redirectTo = locationState?.from || '/';

  const [username, setUsername] = useState(demoCredentials.username);
  const [password, setPassword] = useState(demoCredentials.password);
  const [selectedRole, setSelectedRole] = useState<RoleId>('opsLead');
  const [error, setError] = useState('');

  const highlightMetrics = useMemo(
    () =>
      summaryMetrics.filter((item) =>
        ['totalRevenue', 'marginalRevenue', 'spotRevenue'].includes(item.id),
      ),
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = login(username, password);

    if (!result.success) {
      setError(result.message ?? '登录失败，请重试。');
      return;
    }

    setRole(selectedRole);
    setError('');
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="min-h-screen overflow-hidden bg-shell px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1600px] gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(70,215,255,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(57,217,138,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 shadow-glow shadow-black/40 sm:p-8">
          <div className="absolute -right-24 top-12 h-56 w-56 rounded-full bg-sky/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.2em] text-mist uppercase">
              <Orbit className="h-4 w-4 text-sky" />
              ProfitOS Demo Access
            </div>

            <div className="mt-8 max-w-4xl">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                让客户先看到
                <span className="text-sky"> 决策引擎 </span>
                再看到系统页面。
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-mist sm:text-lg">
                这是 ProfitOS 的演示登录入口。它不接真实用户系统，而是用一个预置演示账号把客户带入“收益操作系统”的完整体验，包括生产经营一体化决策、情景推演和多智能体协同。
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlightMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <div className="text-sm text-mist">{metric.title}</div>
                  <div className="mt-4 text-3xl font-semibold text-white">
                    {formatNumber(metric.value, metric.unit === '元/kWh' ? 3 : 1)}
                  </div>
                  <div className="mt-1 text-sm text-mist">{metric.unit}</div>
                  <div className="mt-4 text-sm leading-6 text-mist">{metric.explanation}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <Panel eyebrow="Power Graph" title="统一经营语义底座">
                <p className="text-sm leading-6 text-mist">
                  把机组、工况、煤价、现货、深调、碳和风险放到同一语义网络里。
                </p>
              </Panel>
              <Panel eyebrow="Twin Sandbox" title="未来方案推演">
                <p className="text-sm leading-6 text-mist">
                  登录后可直接进入沙盘，对负荷、煤价、碳价和报价窗口做收益推演。
                </p>
              </Panel>
              <Panel eyebrow="Agent Runtime" title="多智能体协同">
                <p className="text-sm leading-6 text-mist">
                  演示账号会带你进入完整的成本、市场、负荷、碳资产协同剧本。
                </p>
              </Panel>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/[0.05] px-4 py-2 text-sm text-mist ring-1 ring-white/10">
                默认预填账号密码
              </span>
              <span className="rounded-full bg-white/[0.05] px-4 py-2 text-sm text-mist ring-1 ring-white/10">
                无需用户管理系统
              </span>
              <span className="rounded-full bg-white/[0.05] px-4 py-2 text-sm text-mist ring-1 ring-white/10">
                直接进入演示链路
              </span>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full space-y-5 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,25,42,0.96),rgba(8,17,31,0.98))] p-6 shadow-glow shadow-black/40 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label mb-3">Demo Login</p>
                <h2 className="text-3xl font-semibold text-white">进入 ProfitOS 演示系统</h2>
                <p className="mt-3 text-sm leading-6 text-mist">
                  账号密码已默认填入，点击登录即可开始演示。若需要，你也可以切换一个登录后的默认角色视角。
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky/10">
                <Sparkles className="h-6 w-6 text-sky" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <UserRound className="h-4 w-4 text-sky" />
                  默认用户名
                </div>
                <div className="mt-3 text-lg font-medium text-white">{demoCredentials.username}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <LockKeyhole className="h-4 w-4 text-sky" />
                  默认密码
                </div>
                <div className="mt-3 text-lg font-medium text-white">{demoCredentials.password}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-white">
                  用户名
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none transition placeholder:text-mist focus:border-sky/35 focus:bg-white/[0.06]"
                  placeholder="请输入用户名"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none transition placeholder:text-mist focus:border-sky/35 focus:bg-white/[0.06]"
                  placeholder="请输入密码"
                />
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-white">登录后默认视角</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roleProfiles.map((role) => {
                    const active = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? 'border-sky/30 bg-sky/10'
                            : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-medium text-white">{role.name}</div>
                          {active ? <BadgeCheck className="h-4 w-4 text-sky" /> : null}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-mist">{role.tagline}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-blush/25 bg-blush/10 px-4 py-3 text-sm text-white">
                  {error}
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-mist">
                  演示环境不接后端认证，也不建立用户体系。使用预置账号登录即可。
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky px-5 py-3 text-base font-medium text-[#04101b] transition hover:brightness-110"
                >
                  进入系统
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUsername(demoCredentials.username);
                    setPassword(demoCredentials.password);
                    setError('');
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-base font-medium text-white transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <ShieldCheck className="h-4 w-4 text-sky" />
                  恢复默认账号
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
