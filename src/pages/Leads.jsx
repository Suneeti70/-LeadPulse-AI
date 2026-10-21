import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Download, Plus } from 'lucide-react'
import { leads, SOURCES, STATUSES } from '../data/demo.js'
import { Badge } from '../components/ui.jsx'

const PAGE = 8
const blank = { q: '', cat: '', source: '', status: '', sort: 'score' }

export default function Leads() {
  const nav = useNavigate()
  const [f, setF] = useState(blank)
  const [page, setPage] = useState(0)
  const [sel, setSel] = useState([])
  const set = (k, v) => { setF({ ...f, [k]: v }); setPage(0) }

  const rows = useMemo(() => {
    const q = f.q.toLowerCase()
    return leads
      .filter(l => (!q || l.name.toLowerCase().includes(q) || l.email.includes(q)) && (!f.cat || l.category === f.cat) && (!f.source || l.source === f.source) && (!f.status || l.status === f.status))
      .sort((a, b) => f.sort === 'score' ? b.score - a.score : b.created.localeCompare(a.created))
  }, [f])
  const pages = Math.max(1, Math.ceil(rows.length / PAGE))
  const view = rows.slice(page * PAGE, page * PAGE + PAGE)

  const exportCsv = () => {
    const csv = ['Name,Email,Source,Score,Category,Status', ...rows.map(l => [l.name, l.email, l.source, l.score, l.category, l.status].join(','))].join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'leads.csv'; a.click()
  }
  const Sel = ({ k, label, opts }) => <select className="input" aria-label={label} value={f[k]} onChange={e => set(k, e.target.value)}><option value="">{label}</option>{opts.map(o => <option key={o}>{o}</option>)}</select>

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative"><Search size={14} className="absolute left-2 top-2 text-muted"/><input className="input pl-7 w-56" placeholder="Search name or email" value={f.q} onChange={e => set('q', e.target.value)}/></div>
        <Sel k="cat" label="All categories" opts={['Hot', 'Warm', 'Cold']}/><Sel k="source" label="All sources" opts={SOURCES}/><Sel k="status" label="All statuses" opts={STATUSES}/>
        <select className="input" aria-label="Sort" value={f.sort} onChange={e => set('sort', e.target.value)}><option value="score">Sort: Intent score</option><option value="created">Sort: Newest</option></select>
        <button className="btn" onClick={() => { setF(blank); setPage(0) }}>Clear filters</button>
        <div className="ml-auto flex gap-2"><button className="btn" onClick={exportCsv}><Download size={14}/>Export CSV</button>
          <button className="btn btn-primary" onClick={() => alert('Add Lead form: next step')}><Plus size={14}/>Add Lead</button></div>
      </div>
      {sel.length > 0 && <div className="card px-3 py-2 text-xs flex gap-3 items-center">{sel.length} selected <button className="btn" onClick={() => setSel([])}>Deselect</button></div>}
      <div className="card overflow-x-auto"><table className="w-full">
        <thead><tr><th/>{['Lead', 'Source', 'Budget', 'Score', 'Category', 'Status', 'Last activity'].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{view.map(l => (
          <tr key={l.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => nav(`/leads/${l.id}`)}>
            <td onClick={e => e.stopPropagation()}><input type="checkbox" checked={sel.includes(l.id)} onChange={() => setSel(s => s.includes(l.id) ? s.filter(x => x !== l.id) : [...s, l.id])}/></td>
            <td><div className="font-medium">{l.name}</div><div className="text-[11px] text-muted">{l.email}</div></td>
            <td>{l.source}</td><td>{l.budget}</td><td className="font-semibold">{l.score}</td><td><Badge category={l.category}/></td><td>{l.status}</td><td className="text-muted">{l.lastActivity}</td></tr>))}
          {view.length === 0 && <tr><td colSpan={8} className="text-center text-muted py-8">No leads match these filters. Clear filters to see all leads.</td></tr>}</tbody>
      </table></div>
      <div className="flex items-center justify-between text-xs text-muted"><span>{rows.length} leads · Demo data</span>
        <div className="flex items-center gap-2"><button className="btn" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>Page {page + 1} of {pages}<button className="btn" disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Next</button></div></div>
    </div>
  )
}
