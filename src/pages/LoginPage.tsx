import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  LockKeyhole,
  Radar,
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

  const highlights = [
    {
      icon: Activity,
      title: '经营总入口',
      text: '从总收益中枢进入，再联动市场、深调与碳工作台。',
    },
    {
      icon: BrainCircuit,
      title: '策略协同',
      text: '围绕推演、建议与智能体协作展开演示，不停留在看板展示。',
    },
  ];

  const facts = [
    {
      label: '核心工作台',
      value: '9',
      detail: '覆盖收益、成本、市场、深调、碳与驾驶舱。',
    },
    {
      label: '协同剧本',
      value: '3 个',
      detail: '可直接演示煤价冲击、现货波动与热负荷约束。',
    },
    {
      label: '演示模式',
      value: 'Mock Access',
      detail: '不接真实用户体系，只作为产品汇报入口。',
    },
  ];

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
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1560px] gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <section className="relative overflow-hidden rounded-[32px] border border-white/6 bg-[radial-gradient(circle_at_top_left,rgba(70,215,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(18,60,92,0.16),transparent_24%),linear-gradient(180deg,rgba(18,29,44,0.98),rgba(9,17,29,0.98))] p-7 shadow-glow shadow-black/35 sm:p-9">
          <div className="absolute -left-12 top-12 h-44 w-44 rounded-full bg-sky/10 blur-3xl" />
          <div className="absolute bottom-0 right-8 h-48 w-48 rounded-full bg-emerald-400/8 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="label mb-6">ProfitOS Runtime</div>

            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[64px]">
                ProfitOS
                <br />
                收益操作系统
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-mist sm:text-base">
                面向火电厂与综合能源电厂的演示入口。默认使用预置账号登录，用于展示生产、经营、市场、深调与碳协同的一体化工作台。
              </p>
            </div>

            <div className="mt-9 grid gap-4 lg:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] bg-white/[0.03] px-5 py-5 ring-1 ring-white/6 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky/10">
                        <Icon className="h-4 w-4 text-sky" />
                      </span>
                      <div className="text-base font-medium text-white">{item.title}</div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-mist">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {facts.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.015))] p-5 ring-1 ring-white/6"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-mist/80">{item.label}</div>
                  <div className="mt-4 text-3xl font-semibold text-white">{item.value}</div>
                  <div className="mt-3 text-sm leading-6 text-mist">{item.detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 text-sm text-mist">
              预置账号只用于演示产品形态与决策流程，不接真实用户与权限体系。
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(70,215,255,0.07),transparent_22%),linear-gradient(180deg,rgba(16,26,40,0.98),rgba(9,17,29,0.98))] p-7 shadow-glow shadow-black/35 sm:p-9">
          <div className="absolute -top-8 right-10 h-40 w-40 rounded-full bg-sky/6 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="label mb-3">Demo Login</div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  进入 ProfitOS 演示环境
                </h2>
              </div>
              <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-mist ring-1 ring-white/8">
                默认已填账号
              </span>
            </div>

            <div className="mt-7 rounded-[24px] bg-sky/[0.08] px-5 py-4 ring-1 ring-sky/10">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky/12">
                  <Radar className="h-4 w-4 text-sky" />
                </span>
                <div>
                  <div className="text-base font-medium text-white">演示入口</div>
                  <div className="mt-1 text-sm leading-6 text-mist">
                    默认登录后进入总收益中枢，可从导航切换到市场、沙盘和智能体工作台。
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="rounded-[24px] bg-white/[0.03] px-5 py-4 ring-1 ring-white/7">
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-mist"
                >
                  <UserRound className="h-4 w-4 text-sky" />
                  用户名
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-3 w-full border-none bg-transparent p-0 text-xl font-semibold text-white outline-none placeholder:text-mist sm:text-2xl"
                  placeholder="请输入用户名"
                />
              </div>

              <div className="rounded-[24px] bg-white/[0.03] px-5 py-4 ring-1 ring-white/7">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-mist"
                >
                  <LockKeyhole className="h-4 w-4 text-sky" />
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-3 w-full border-none bg-transparent p-0 text-xl font-semibold text-white outline-none placeholder:text-mist sm:text-2xl"
                  placeholder="请输入密码"
                />
              </div>

              <div className="rounded-[24px] bg-white/[0.025] px-5 py-4 ring-1 ring-white/6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-mist">
                  <span className="font-medium text-white">演示账号</span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-white ring-1 ring-white/8">
                    {demoCredentials.username}
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-white ring-1 ring-white/8">
                    {demoCredentials.password}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-[24px] bg-[linear-gradient(180deg,rgba(25,38,54,0.96),rgba(16,27,40,0.96))] px-6 py-4 text-lg font-semibold text-white ring-1 ring-white/8 transition hover:bg-[linear-gradient(180deg,rgba(30,46,66,1),rgba(18,30,45,1))] hover:ring-sky/18"
              >
                登录系统
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setUsername(demoCredentials.username);
                    setPassword(demoCredentials.password);
                    setError('');
                  }}
                  className="rounded-full bg-white/[0.04] px-3.5 py-2 text-sm text-mist ring-1 ring-white/8 transition hover:text-white"
                >
                  恢复默认
                </button>
                <span className="rounded-full bg-white/[0.04] px-3.5 py-2 text-sm text-mist ring-1 ring-white/8">
                  前端校验
                </span>
                <span className="rounded-full bg-white/[0.04] px-3.5 py-2 text-sm text-mist ring-1 ring-white/8">
                  支持退出
                </span>
              </div>

              {error ? (
                <div className="rounded-[22px] bg-blush/10 px-5 py-4 text-sm leading-6 text-white ring-1 ring-blush/20">
                  {error}
                </div>
              ) : (
                <div className="rounded-[22px] bg-emerald-400/10 px-5 py-4 text-sm font-medium text-white ring-1 ring-emerald-400/12">
                  演示账号已自动填充，点击即可进入系统。
                </div>
              )}

              <div className="rounded-[22px] bg-white/[0.02] px-5 py-4 text-sm leading-7 text-mist ring-1 ring-white/6">
                这是演示用途的静态登录页，仅用于进入产品工作台，不建立真实用户、权限与账号体系。
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
