import { Link, useNavigate } from 'react-router-dom'
import { Users, Flame, Gauge, PhoneCall } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { leads, SOURCES, STATUSES, activityTrend } from '../data/demo.js'
import { Badge, Kpi, Panel, COLORS } from '../components/ui.jsx'

const count = (arr, fn) => arr.reduce((m, l) => ({ ...m, [fn(l)]: (m[fn(l)] || 0) + 1 }), {})
const toRows = (obj, keys) => keys.map(k => ({ name: k, value: obj[k] || 0 }))

export default function Overview() {
  const nav = useNavigate()
  const hot = leads.filter(l => l.category === 'Hot').length
  const avg = Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)
  const follow = leads.filter(l => l.score >= 40 && ['New', 'Contacted'].includes(l.status)).length
  const intent = toRows(count(leads, l => l.category), ['Cold', 'Warm', 'Hot'])
  const src = toRows(count(leads, l => l.source), SOURCES)
  const stat = toRows(count(leads, l => l.status), STATUSES)
  const top = [...leads].sort((a, b) => b.score - a.score).slice(0, 6)
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted">Demo data: figures below are sample values until the Flask API is connected.</p>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <Kpi label="Total Leads" value={leads.length} icon={Users} note="Demo data"/>
        <Kpi label="Hot Leads" value={hot} icon={Flame} note="Score 70+"/>
        <Kpi label="Average Intent Score" value={avg} icon={Gauge} note="Out of 100"/>
        <Kpi label="Needs Follow-up" value={follow} icon={PhoneCall} note="Warm/Hot, not yet engaged"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Panel title="Lead Intent Distribution"><div className="h-44"><ResponsiveContainer>
          <PieChart><Pie data={intent} dataKey="value" innerRadius={36} outerRadius={64}>{intent.map(d => <Cell key={d.name} fill={COLORS[d.name]}/>)}</Pie><Tooltip/></PieChart>
        </ResponsiveContainer></div>
          <div className="flex justify-center gap-3 text-[11px] text-muted">{intent.map(d => <span key={d.name}><i className="inline-block w-2 h-2 mr-1 rounded-sm" style={{ background: COLORS[d.name] }}/>{d.name} {d.value}</span>)}</div></Panel>
        <Panel title="Leads by Source"><div className="h-52"><ResponsiveContainer>
          <BarChart data={src} layout="vertical" margin={{ left: 24 }}><XAxis type="number" hide/><YAxis type="category" dataKey="name" fontSize={11} width={96} tickLine={false} axisLine={false}/><Tooltip/><Bar dataKey="value" fill="#4F46E5" radius={2}/></BarChart>
        </ResponsiveContainer></div></Panel>
        <Panel title="Lead Activity Trend"><div className="h-52"><ResponsiveContainer>
          <LineChart data={activityTrend}><CartesianGrid stroke="#E2E8F0" vertical={false}/><XAxis dataKey="day" fontSize={11}/><YAxis fontSize={11} width={28}/><Tooltip/><Line dataKey="events" stroke="#4F46E5" strokeWidth={2} dot={false}/></LineChart>
        </ResponsiveContainer></div></Panel>
        <Panel title="Lead Status Distribution"><div className="h-52"><ResponsiveContainer>
          <BarChart data={stat}><XAxis dataKey="name" fontSize={10} interval={0} tickLine={false}/><YAxis fontSize={11} width={24}/><Tooltip/><Bar dataKey="value" fill="#64748B" radius={2}/></BarChart>
        </ResponsiveContainer></div></Panel>
      </div>
      <Panel title="Priority Leads" action={<Link to="/leads" className="btn">View All Leads</Link>}>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr>{['Lead', 'Source', 'Budget', 'Score', 'Category', 'Last activity', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{top.map(l => (
            <tr key={l.id} className="hover:bg-slate-50">
              <td className="font-medium">{l.name}</td><td>{l.source}</td><td>{l.budget}</td><td className="font-semibold">{l.score}</td>
              <td><Badge category={l.category}/></td><td className="text-muted">{l.lastActivity}</td><td>{l.status}</td>
              <td><button className="btn" onClick={() => nav(`/leads/${l.id}`)}>View Lead</button></td></tr>))}</tbody>
        </table></div>
      </Panel>
    </div>
  )
}
