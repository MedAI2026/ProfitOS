import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  BrainCircuit,
  LockKeyhole,
  Radar,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useProfitStore } from '@/store/useProfitStore';
import { demoCredentials, useAuthStore } from '@/store/useAuthStore';

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
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = login(username, password);

    if (!result.success) {
      setError(result.message ?? '登录失败，请重试。');
      return;
    }

    setRole('opsLead');
    setError('');
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="min-h-screen overflow-hidden bg-shell px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1640px] gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(70,215,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(23,72,108,0.2),transparent_28%),linear-gradient(180deg,rgba(19,31,46,0.98),rgba(8,17,31,0.98))] p-7 shadow-glow shadow-black/40 sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
          <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />
          <div className="absolute bottom-0 right-8 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="label mb-7">ProfitOS Runtime</div>

            <div className="max-w-4xl">
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                ProfitOS
                <br />
                收益操作系统
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-8 text-mist sm:text-lg">
                面向火电厂与综合能源电厂的演示入口。默认使用预置账号登录，用于展示生产、经营、市场、深调与碳协同的一体化工作台。
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {[
                {
                  icon: Activity,
                  text: '从总收益中枢进入，而不是从单张报表进入。',
                },
                {
                  icon: BrainCircuit,
                  text: '围绕策略判断、情景推演和智能体协同展开演示。',
                },
                {
                  icon: BadgeDollarSign,
                  text: '把成本、负荷、市场和碳放在同一经营决策链路里。',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-4 rounded-[28px] border border-white/8 bg-white/[0.035] px-5 py-5 backdrop-blur-sm"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky/12">
                      <Icon className="h-5 w-5 text-sky" />
                    </span>
                    <p className="text-base leading-7 text-white">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                <div className="text-sm text-mist">核心工作台</div>
                <div className="mt-4 text-5xl font-semibold text-white">9</div>
                <div className="mt-3 text-sm leading-6 text-mist">收益、成本、市场、深调、碳与驾驶舱全链路可演示。</div>
              </div>
              <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                <div className="text-sm text-mist">协同剧本</div>
                <div className="mt-4 text-3xl font-semibold text-white">3 个预置场景</div>
                <div className="mt-3 text-sm leading-6 text-mist">覆盖煤价冲击、现货波动和高热负荷约束演示。</div>
              </div>
              <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                <div className="text-sm text-mist">演示模式</div>
                <div className="mt-4 text-3xl font-semibold text-white">Mock Access</div>
                <div className="mt-3 text-sm leading-6 text-mist">不接真实用户管理，只用于进入产品工作台与汇报链路。</div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(70,215,255,0.10),transparent_24%),linear-gradient(180deg,rgba(17,28,42,0.98),rgba(8,17,31,0.98))] p-7 shadow-glow shadow-black/40 sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="label mb-4">Demo Login</div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  进入 ProfitOS 演示环境
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist">
                默认已填账号
              </span>
            </div>

            <div className="mt-9 rounded-[30px] border border-sky/10 bg-sky/8 px-5 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky/14">
                  <Radar className="h-5 w-5 text-sky" />
                </span>
                <div>
                  <div className="text-lg font-medium text-white">演示入口</div>
                  <div className="mt-1 text-sm leading-6 text-mist">
                    默认登录后进入总收益中枢，可从导航切换到市场、沙盘和智能体工作台。
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="rounded-[30px] border border-white/8 bg-white/[0.03] px-6 py-5">
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-sm font-medium text-mist"
                >
                  <UserRound className="h-4 w-4 text-sky" />
                  用户名
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-4 w-full border-none bg-transparent p-0 text-2xl font-semibold text-white outline-none placeholder:text-mist"
                  placeholder="请输入用户名"
                />
              </div>

              <div className="rounded-[30px] border border-white/8 bg-white/[0.03] px-6 py-5">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium text-mist"
                >
                  <LockKeyhole className="h-4 w-4 text-sky" />
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-4 w-full border-none bg-transparent p-0 text-2xl font-semibold text-white outline-none placeholder:text-mist"
                  placeholder="请输入密码"
                />
              </div>

              <div className="rounded-[30px] border border-white/8 bg-white/[0.03] px-5 py-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-mist">
                  <span className="font-medium text-white">演示账号</span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-white ring-1 ring-white/10">
                    {demoCredentials.username}
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-white ring-1 ring-white/10">
                    {demoCredentials.password}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(23,34,48,0.96),rgba(15,24,37,0.96))] px-6 py-5 text-xl font-semibold text-white transition hover:border-sky/25 hover:bg-[linear-gradient(180deg,rgba(23,39,58,1),rgba(14,24,37,1))]"
              >
                登录系统
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setUsername(demoCredentials.username);
                    setPassword(demoCredentials.password);
                    setError('');
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist transition hover:border-white/20 hover:text-white"
                >
                  恢复默认
                </button>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist">
                  前端校验
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist">
                  支持退出
                </span>
              </div>

              {error ? (
                <div className="rounded-[28px] border border-blush/25 bg-blush/10 px-5 py-4 text-sm leading-6 text-white">
                  {error}
                </div>
              ) : (
                <div className="rounded-[28px] border border-emerald-400/12 bg-emerald-400/10 px-5 py-5 text-base font-medium text-white">
                  演示账号已自动填充，点击即可进入系统。
                </div>
              )}

              <div className="rounded-[28px] border border-white/20 bg-transparent px-5 py-5 text-sm leading-7 text-mist">
                这是演示用途的静态登录页，仅用于进入产品工作台，不建立真实用户、权限与账号体系。
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
