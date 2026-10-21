import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Activity, Sparkles, BarChart3, BellRing, Plug, Settings, LogOut, Search, Bell, Menu, Zap } from 'lucide-react'

const nav = [
  ['/', 'Overview', LayoutDashboard], ['/leads', 'All Leads', Users], ['/activity', 'Activity Tracking', Activity],
  ['/insights', 'AI Insights', Sparkles], ['/campaigns', 'Campaign Analytics', BarChart3],
  ['/followups', 'Follow-ups', BellRing], ['/integrations', 'Integrations', Plug], ['/settings', 'Settings', Settings],
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const current = nav.find(n => n[0] === pathname) || (pathname.startsWith('/leads') ? nav[1] : nav[0])
  return (
    <div className="min-h-screen flex">
      {open && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setOpen(false)}/>}
      <aside className={`fixed lg:sticky top-0 z-30 h-screen w-56 shrink-0 bg-white border-r border-line flex flex-col transition-transform ${open ? '' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-12 px-4 flex items-center gap-2 border-b border-line">
          <div className="h-7 w-7 rounded-md bg-primary text-white grid place-items-center"><Zap size={16}/></div>
          <span className="font-semibold">LeadPulse AI</span>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 h-8 px-2 rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 ${isActive ? 'bg-indigo-50 text-primary' : 'text-muted hover:bg-slate-50'}`}>
              <Icon size={16}/>{label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-line flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-100 text-primary grid place-items-center text-xs font-semibold">SR</div>
          <div className="flex-1 min-w-0"><div className="text-xs font-medium truncate">Suneeti Rana</div><div className="text-[11px] text-muted">Admin</div></div>
          <button className="btn !px-2" aria-label="Log out" onClick={() => alert('Connect logout to your auth API')}><LogOut size={14}/></button>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="h-12 bg-white border-b border-line px-4 flex items-center gap-3 sticky top-0 z-10">
          <button className="btn !px-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={16}/></button>
          <div className="min-w-0"><div className="text-[11px] text-muted">LeadPulse / {current[1]}</div><div className="text-sm font-semibold leading-tight">{current[1]}</div></div>
          <div className="relative ml-auto hidden md:block"><Search size={14} className="absolute left-2 top-2 text-muted"/>
            <input className="input pl-7 w-64" placeholder="Search leads"/></div>
          <select className="input" aria-label="Date range"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select>
          <button className="btn !px-2" aria-label="Notifications"><Bell size={14}/></button>
          <button className="btn !px-2" aria-label="Profile menu">SR</button>
        </header>
        <main className="p-4"><Outlet/></main>
      </div>
    </div>
  )
}
