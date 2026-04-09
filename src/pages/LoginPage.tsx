import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
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
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[560px] items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(70,215,255,0.12),transparent_28%),linear-gradient(180deg,rgba(14,25,42,0.96),rgba(8,17,31,0.98))] p-7 shadow-glow shadow-black/40 sm:p-9">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />

          <div className="text-center">
            <div className="label mb-3">ProfitOS</div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              ProfitOS
            </h1>
            <p className="mt-3 text-sm leading-6 text-mist sm:text-base">
              电厂生产经营收益操作系统
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium text-white"
              >
                <UserRound className="h-4 w-4 text-sky" />
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
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-white"
              >
                <LockKeyhole className="h-4 w-4 text-sky" />
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

            {error ? (
              <div className="rounded-2xl border border-blush/25 bg-blush/10 px-4 py-3 text-sm text-white">
                {error}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mist">
                演示账号已默认填入，点击登录即可进入系统。
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky px-5 py-3 text-base font-medium text-[#04101b] transition hover:brightness-110"
              >
                登录
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
                恢复默认
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
