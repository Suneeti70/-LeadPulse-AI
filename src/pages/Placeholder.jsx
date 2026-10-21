import { Inbox } from 'lucide-react'
export default function Placeholder({ title, needs }) {
  return (
    <div className="card p-8 text-center max-w-xl mx-auto mt-6">
      <Inbox className="mx-auto text-muted" size={28}/>
      <h2 className="font-semibold mt-2">{title}</h2>
      <p className="text-xs text-muted mt-1">This page is not built yet. It needs {needs}.</p>
    </div>
  )
}
