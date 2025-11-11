import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

const API = import.meta.env.VITE_BACKEND_URL

export default function Dashboard(){
  const { t } = useI18n()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch(`${API}/leaderboard`).then(r=>r.json()).then(setLeaderboard).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <h2 className="text-2xl font-bold mb-6">{t.dashboard}</h2>
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">{t.leaderboard}</h3>
            <ul className="space-y-2">
              {leaderboard.map((row, i)=> (
                <li key={i} className="flex items-center justify-between border-b last:border-b-0 py-2">
                  <span className="font-mono">{i+1}.</span>
                  <span className="truncate max-w-[60%]">{row.user_email}</span>
                  <span className="font-semibold">{row.score}</span>
                </li>
              ))}
              {leaderboard.length === 0 && <p className="text-sm text-slate-500">No data yet</p>}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
