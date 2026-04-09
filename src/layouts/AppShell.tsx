import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import TopBar from '@/components/TopBar';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-shell text-ink lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <SidebarNav />
      <main className="min-w-0">
        <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <TopBar />
          <div className="mt-6 flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
