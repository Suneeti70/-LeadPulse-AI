import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import Leads from './pages/Leads.jsx'
import LeadDetail from './pages/LeadDetail.jsx'
import Placeholder from './pages/Placeholder.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Overview/>}/>
        <Route path="/leads" element={<Leads/>}/>
        <Route path="/leads/:id" element={<LeadDetail/>}/>
        <Route path="/activity" element={<Placeholder title="Activity Tracking" needs="event data from /api/activity"/>}/>
        <Route path="/insights" element={<Placeholder title="AI Insights" needs="model metrics from /api/model (shows “Not evaluated yet” until real results exist)"/>}/>
        <Route path="/campaigns" element={<Placeholder title="Campaign Analytics" needs="campaign and outcome data (metrics stay N/A until connected)"/>}/>
        <Route path="/followups" element={<Placeholder title="Follow-ups" needs="message data from /api/followups"/>}/>
        <Route path="/integrations" element={<Placeholder title="Integrations" needs="integration settings"/>}/>
        <Route path="/settings" element={<Placeholder title="Settings" needs="user settings"/>}/>
      </Route>
    </Routes>
  )
}
