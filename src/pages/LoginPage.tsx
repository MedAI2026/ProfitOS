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
    title: '收益中枢入口',
    description: '从经营判断进入，而不是从单张报表进入。',
  },
  {
    icon: Sparkles,
    title: '智能策略演示',
    description: '围绕推演、建议和协同剧本展开产品讲述。',
  },
  {
    icon: ShieldCheck,
    title: '生产经营一体',
    description: '把成本、负荷、市场与碳放进同一决策语境。',
  },
];

const metrics = [
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
  const [keepSignedIn, setKeepSignedIn] = useState(true);
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
    <div className="min-h-screen bg-[#05070d] p-4 text-ink sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1680px] overflow-hidden rounded-[34px] border border-white/8 bg-[#07101b] shadow-[0_42px_120px_rgba(0,0,0,0.42)] xl:grid-cols-[1.08fr_0.92fr]">
        <section className="relative border-b border-white/6 bg-[radial-gradient(circle_at_18%_18%,rgba(83,148,237,0.18),transparent_26%),radial-gradient(circle_at_76%_14%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_60%_88%,rgba(39,88,166,0.18),transparent_32%),linear-gradient(180deg,#1b2638_0%,#121a2a_48%,#0b111d_100%)] px-7 py-8 sm:px-12 sm:py-12 xl:border-b-0 xl:border-r xl:border-white/6">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_38%,transparent_68%,rgba(255,255,255,0.02))]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-3 rounded-full bg-white/[0.06] px-5 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-white/72 ring-1 ring-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4d8ef7]" />
              ProfitOS Runtime
            </div>

            <div className="mt-14 max-w-3xl">
              <h1 className="text-[48px] font-semibold leading-[1.04] tracking-tight text-white sm:text-[56px] lg:text-[68px]">
                ProfitOS
                <br />
                收益操作系统
              </h1>
              <p className="mt-8 max-w-2xl text-[17px] leading-9 text-white/56 sm:text-[18px]">
                面向火电厂与综合能源电厂的演示入口。默认使用预置账号登录，用于展示生产、经营、市场、深调与碳协同的一体化工作台。
              </p>
            </div>

            <div className="mt-12 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-5 rounded-[28px] bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 py-5 ring-1 ring-white/10 backdrop-blur-sm"
                  >
                    <span className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#304d81]/72 text-[#77afff]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[18px] font-semibold text-white">{item.title}</div>
                      <p className="mt-2 text-[15px] leading-7 text-white/46">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto border-t border-white/10 pt-8">
              <div className="grid gap-6 sm:grid-cols-3">
                {metrics.map((item) => (
                  <div key={item.label}>
                    <div className="text-[46px] font-semibold tracking-tight text-white">{item.value}</div>
                    <div className="mt-2 text-[18px] text-white/58">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center bg-[linear-gradient(180deg,#030915_0%,#050c18_100%)] px-6 py-10 sm:px-10 xl:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,94,186,0.12),transparent_36%)]" />

          <div className="relative z-10 w-full max-w-[600px] rounded-[36px] bg-[#141c2c]/96 px-6 py-7 ring-1 ring-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.34)] sm:px-8 sm:py-9">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#5aa2ff]">
              <span className="rounded-xl bg-[#1e3d73] px-3 py-2 uppercase tracking-[0.04em] text-[#70aeff]">
                Demo Login
              </span>
              <span>演示环境入口</span>
            </div>

            <h2 className="mt-6 text-[34px] font-semibold leading-tight tracking-tight text-white sm:text-[40px]">
              进入 ProfitOS 演示环境
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-white/52">
              默认登录后进入总收益中枢，可从导航切换到市场、沙盘、智能体与经营驾驶舱。
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-[15px] font-semibold text-white"
                >
                  <UserRound className="h-4 w-4 text-[#76b1ff]" />
                  用户名
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-3 h-16 w-full rounded-2xl border-none bg-[#253142] px-5 text-[17px] font-semibold text-white outline-none ring-1 ring-white/10 placeholder:text-white/28"
                  placeholder="请输入用户名"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-[15px] font-semibold text-white"
                >
                  <LockKeyhole className="h-4 w-4 text-[#76b1ff]" />
                  密码
                </label>
                <div className="relative mt-3">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-16 w-full rounded-2xl border-none bg-[#253142] px-5 pr-16 text-[17px] font-semibold text-white outline-none ring-1 ring-white/10 placeholder:text-white/28"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-4 flex items-center text-white/42 transition hover:text-white/72"
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={applyDemoCredentials}
                  className="rounded-2xl bg-[#244a8b] px-5 py-3 text-[15px] font-semibold text-[#84b8ff] ring-1 ring-[#3562b8]"
                >
                  演示账号
                </button>
                <span className="rounded-2xl bg-[#253041] px-5 py-3 text-[15px] font-semibold text-white/74 ring-1 ring-white/10">
                  {demoCredentials.username}
                </span>
                <span className="rounded-2xl bg-[#253041] px-5 py-3 text-[15px] font-semibold text-white/74 ring-1 ring-white/10">
                  {demoCredentials.password}
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex h-16 w-full items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(90deg,#1f63ff,#3f87ff)] text-[18px] font-semibold text-white shadow-[0_16px_40px_rgba(31,99,255,0.34)] transition hover:brightness-110"
              >
                登录系统
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-4 text-[15px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 font-medium">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(event) => setKeepSignedIn(event.target.checked)}
                    className="h-4 w-4 rounded border-white/15 bg-transparent accent-[#2f72ff]"
                  />
                  保持登录
                </label>
                <div className="flex items-center gap-3">
                  <span>前端校验</span>
                  <span className="text-white/28">|</span>
                  <span>支持退出</span>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl bg-[#381a22] px-5 py-4 text-[15px] leading-7 text-white ring-1 ring-[#6f3344]">
                  {error}
                </div>
              ) : (
                <div className="rounded-2xl bg-[#132a57] px-5 py-4 text-[15px] font-medium text-[#84b8ff] ring-1 ring-[#2b58a5]">
                  演示账号已自动填充，点击即可进入系统。
                </div>
              )}

              <div className="text-center text-[14px] leading-7 text-white/38">
                这是演示用途的模拟登录页，仅用于进入产品工作台，不建立真实用户、权限与账号体系。
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
