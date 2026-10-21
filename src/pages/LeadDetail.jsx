import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { leads, STATUSES } from '../data/demo.js'
import { Badge, Panel } from '../components/ui.jsx'

export default function LeadDetail() {
  const { id } = useParams()
  const lead = leads.find(l => l.id === Number(id))
  const [status, setStatus] = useState(lead?.status)
  const [notes, setNotes] = useState('')
  const [msg, setMsg] = useState('')
  if (!lead) return <div className="card p-6 text-center text-muted">Lead not found. <Link className="text-primary" to="/leads">Back to All Leads</Link></div>
  const recalc = async () => {
    try { const r = await fetch(`/api/leads/${lead.id}/score`, { method: 'POST' }); if (!r.ok) throw 0; setMsg('Score recalculated.') }
    catch { setMsg('Backend not reachable. Start the Flask API to recalculate.') }
  }
  const Row = ({ k, v }) => <div className="flex justify-between py-1.5 border-b border-line last:border-0"><span className="text-muted">{k}</span><span className="font-medium">{v}</span></div>
  return (
    <div className="space-y-3">
      <Link to="/leads" className="btn w-fit"><ArrowLeft size={14}/>All Leads</Link>
      <div className="grid lg:grid-cols-3 gap-3">
        <Panel title="Profile">
          <Row k="Name" v={lead.name}/><Row k="Email" v={lead.email}/><Row k="Source" v={lead.source}/><Row k="Budget" v={lead.budget}/><Row k="Created" v={lead.created}/>
          <label className="block text-xs text-muted mt-3 mb-1">Status</label>
          <select className="input w-full" value={status} onChange={e => setStatus(e.target.value)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select>
          <label className="block text-xs text-muted mt-3 mb-1">Notes</label>
          <textarea className="input w-full h-20 py-1" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add a note about this lead"/>
        </Panel>
        <Panel title="Intent score" action={<button className="btn" onClick={recalc}><RefreshCw size={12}/>Recalculate Score</button>}>
          <div className="flex items-end gap-3"><span className="text-4xl font-semibold">{lead.score}</span><span className="text-muted pb-1">/ 100</span><Badge category={lead.category}/></div>
          {msg && <p className="text-xs text-muted mt-2">{msg}</p>}
          <h4 className="text-xs font-semibold mt-4 mb-1">Why this score?</h4>
          <p className="text-xs text-muted">Explanations are not available yet. They will appear here once the model returns feature contributions for this lead.</p>
        </Panel>
        <Panel title="Recent activity">
          <p className="text-xs text-muted">No activity data connected. Property views, calculator use, and enquiries will appear here from /api/leads/{lead.id}/activity.</p>
        </Panel>
      </div>
    </div>
  )
}
