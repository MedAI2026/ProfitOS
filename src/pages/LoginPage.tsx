import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useProfitStore } from '@/store/useProfitStore';
import { demoCredentials, useAuthStore } from '@/store/useAuthStore';

interface LoginLocationState {
  from?: string;
}

const highlights = [
  {
    icon: Activity,
    title: '收益决策入口',
    description: '从总收益中枢切入，而不是从单张经营报表切入。',
  },
  {
    icon: Sparkles,
    title: '策略推演视角',
    description: '围绕情景模拟、建议生成与协同剧本组织演示链路。',
  },
  {
    icon: ShieldCheck,
    title: '生产经营一体',
    description: '把成本、负荷、市场与碳放进同一套经营判断语境。',
  },
];

const summaryMetrics = [
  { value: '9', label: '核心工作台' },
  { value: '3', label: '协同剧本' },
  { value: '8', label: '经营智能体' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setRole = useProfitStore((state) => state.setRole);
  const login = useAuthStore((state) => state.login);

  const locationState = (location.state as LoginLocationState | null) ?? null;
  const redirectTo = locationState?.from || '/';

  const [username, setUsername] = useState(demoCredentials.username);
  const [password, setPassword] = useState(demoCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.classList.add('login-body');

    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  function applyDemoCredentials() {
    setUsername(demoCredentials.username);
    setPassword(demoCredentials.password);
    setError('');
  }

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
    <div className="h-[100dvh] overflow-hidden bg-[#04070d] px-3 py-3 text-ink sm:px-4 sm:py-4">
      <div className="mx-auto grid h-full max-w-[1560px] overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(11,17,28,0.98),rgba(6,10,18,1))] shadow-[0_40px_120px_rgba(0,0,0,0.42)] ring-1 ring-white/7 xl:grid-cols-[1.03fr_0.97fr]">
        <section className="relative border-b border-white/6 bg-[radial-gradient(circle_at_top_left,rgba(74,134,235,0.18),transparent_24%),radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,#1a2433_0%,#111827_46%,#0a0f19_100%)] px-6 py-6 sm:px-8 sm:py-8 xl:border-b-0 xl:border-r xl:border-white/6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(65,115,214,0.12),transparent_30%)]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-3 rounded-full bg-white/[0.05] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/68 ring-1 ring-white/8">
              <span className="h-2 w-2 rounded-full bg-[#4c8fff]" />
              ProfitOS Runtime
            </div>

            <div className="mt-8 max-w-2xl">
              <h1 className="text-[38px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[46px] lg:text-[54px]">
                ProfitOS
                <br />
                收益操作系统
              </h1>
              <p className="mt-4 max-w-xl text-[14px] leading-7 text-white/52 sm:text-[15px]">
                面向火电厂与综合能源电厂的演示入口。默认使用预置账号登录，用于展示生产、经营、市场、深调与碳协同的一体化工作台。
              </p>
            </div>

            <div className="mt-6 space-y-0">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`flex items-start gap-4 py-3.5 ${index !== 0 ? 'border-t border-white/6' : ''}`}
                  >
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[#79afff] ring-1 ring-white/8">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[16px] font-medium text-white">{item.title}</div>
                      <p className="mt-1.5 text-[13px] leading-6 text-white/44">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <div className="grid gap-4 border-t border-white/6 pt-5 sm:grid-cols-3">
                {summaryMetrics.map((item) => (
                  <div key={item.label}>
                    <div className="text-[28px] font-semibold tracking-tight text-white">{item.value}</div>
                    <div className="mt-1.5 text-[13px] text-white/48">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-5 py-6 sm:px-7 sm:py-7 xl:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,94,186,0.10),transparent_36%)]" />

          <div className="relative z-10 w-full max-w-[470px] rounded-[28px] bg-[linear-gradient(180deg,rgba(20,28,44,0.92),rgba(15,22,36,0.96))] px-5 py-5 shadow-[0_24px_72px_rgba(0,0,0,0.30)] ring-1 ring-white/7 sm:px-6 sm:py-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6ea8ff]">
              Demo Access
            </div>

            <h2 className="mt-3 text-[24px] font-semibold tracking-tight text-white sm:text-[28px]">
              登录 ProfitOS
            </h2>
            <p className="mt-2.5 text-[13px] leading-6 text-white/48">
              使用预置演示账号进入系统，查看收益中枢、策略沙盘与智能体协同工作台。
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-[12px] font-medium text-white/72"
                >
                  <UserRound className="h-4 w-4 text-[#78afff]" />
                  用户名
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 h-12 w-full rounded-[16px] border-none bg-white/[0.05] px-4 text-[15px] font-medium text-white outline-none ring-1 ring-white/8 placeholder:text-white/22 focus:ring-[#4f8dff]/40"
                  placeholder="请输入用户名"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-[12px] font-medium text-white/72"
                >
                  <LockKeyhole className="h-4 w-4 text-[#78afff]" />
                  密码
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-[16px] border-none bg-white/[0.05] px-4 pr-14 text-[15px] font-medium text-white outline-none ring-1 ring-white/8 placeholder:text-white/22 focus:ring-[#4f8dff]/40"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-4 flex items-center text-white/36 transition hover:text-white/72"
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="rounded-[16px] bg-white/[0.035] px-4 py-3 ring-1 ring-white/7">
                <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/34">
                  Demo Credentials
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm text-white/74">
                    {demoCredentials.username}
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-sm text-white/74">
                    {demoCredentials.password}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={applyDemoCredentials}
                  className="text-sm font-medium text-[#7bb3ff] transition hover:text-white"
                >
                  恢复默认账号
                </button>
                <div className="text-sm text-white/34">前端演示登录</div>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[16px] bg-[linear-gradient(90deg,#225fff,#3b84ff)] text-[15px] font-semibold text-white shadow-[0_14px_32px_rgba(34,95,255,0.28)] transition hover:brightness-110"
              >
                进入系统
                <ArrowRight className="h-4 w-4" />
              </button>

              {error ? (
                <div className="rounded-[16px] bg-[#351923] px-4 py-3 text-sm leading-6 text-white ring-1 ring-[#693244]">
                  {error}
                </div>
              ) : (
                <div className="rounded-[16px] bg-[#11274f] px-4 py-3 text-sm text-[#8ebcff] ring-1 ring-[#244a8e]">
                  演示账号已填充，可直接进入系统。
                </div>
              )}

              <div className="pt-1 text-center text-[13px] leading-6 text-white/34">
                仅用于进入产品演示工作台，不建立真实用户与权限体系。
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
