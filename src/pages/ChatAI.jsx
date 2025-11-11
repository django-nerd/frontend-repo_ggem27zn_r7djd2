import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useI18n } from '../i18n'

const API = import.meta.env.VITE_BACKEND_URL

export default function ChatAI(){
  const { t, locale } = useI18n()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const send = async (preset) => {
    const text = preset || input
    if (!text) return
    setLoading(true)
    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    try {
      const r = await fetch(`${API}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: locale, history: next.map(m=>({role:m.role, content:m.content})) })
      })
      const data = await r.json()
      setMessages([...next, { role: 'assistant', content: data.reply || data.text || JSON.stringify(data) }])
    } catch(e){
      setMessages([...next, { role: 'assistant', content: 'Error contacting AI tutor' }])
    } finally {
      setLoading(false)
    }
  }

  const explainArabic = () => send(t.explainInArabic)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h2 className="text-2xl font-bold mb-6">{t.chatAI}</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="h-[50vh] overflow-y-auto space-y-3 p-2">
            {messages.map((m, i)=> (
              <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role==='user' ? 'bg-blue-600 text-white ml-auto' : 'bg-slate-100'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder={t.askAnything} className="flex-1 p-3 rounded-lg border" />
            <button onClick={()=>send()} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">{loading ? '...' : 'Send'}</button>
            <button onClick={explainArabic} className="px-4 py-2 rounded-lg bg-slate-200">{t.explainInArabic}</button>
          </div>
        </div>
      </main>
    </div>
  )
}
