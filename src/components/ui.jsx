export const COLORS = { Hot: '#16A34A', Warm: '#D97706', Cold: '#64748B' }
export function Badge({ category }) {
  const cls = { Hot: 'bg-green-50 text-green-700', Warm: 'bg-amber-50 text-amber-700', Cold: 'bg-slate-100 text-slate-600' }[category]
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{category}</span>
}
export function Kpi({ label, value, icon: Icon, note }) {
  return (
    <div className="card p-3 flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-indigo-50 text-primary grid place-items-center"><Icon size={18}/></div>
      <div><div className="text-xs text-muted">{label}</div>
        <div className="text-xl font-semibold leading-tight">{value}</div>
        <div className="text-[11px] text-muted">{note}</div></div>
    </div>
  )
}
export function Panel({ title, children, action }) {
  return (
    <section className="card p-3">
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold">{title}</h3>{action}</div>
      {children}
    </section>
  )
}
