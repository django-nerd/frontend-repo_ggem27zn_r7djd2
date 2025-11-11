import Navbar from '../components/Navbar'
import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'

const API = import.meta.env.VITE_BACKEND_URL

export default function Lesson(){
  const { t, locale } = useI18n()
  const [prompt, setPrompt] = useState('Intro to Photosynthesis')
  const [lesson, setLesson] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateLesson = async () => {
    setLoading(true)
    setLesson(null)
    try {
      const r = await fetch(`${API}/ai/lesson`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ prompt, language: locale }) })
      const data = await r.json()
      setLesson(data)
    } finally { setLoading(false) }
  }

  const generateQuiz = async () => {
    if (!lesson?.id && !lesson?.content) return
    setLoading(true)
    try {
      // Fallback path: if no lesson id, treat lesson content as transient and request quiz by making a temp lesson first could be added later.
      const res = await fetch(`${API}/quiz/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ lesson_id: lesson.id || 'transient', num_questions: 5 }) })
      const data = await res.json()
      setQuiz(data.quiz || data)
    } catch(e){ setQuiz(null) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <h2 className="text-2xl font-bold mb-6">Lesson Generator</h2>
        <div className="bg-white rounded-xl shadow p-4 space-y-4">
          <div className="flex gap-2">
            <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="flex-1 p-3 rounded-lg border" />
            <button onClick={generateLesson} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Generate</button>
          </div>
          {loading && <p>Loading...</p>}
          {lesson && (
            <article className="prose max-w-none">
              {lesson.title && <h3 className="text-xl font-semibold">{lesson.title}</h3>}
              <div dangerouslySetInnerHTML={{ __html: lesson.content || '' }} />
              <div className="mt-4">
                <button onClick={generateQuiz} className="px-4 py-2 rounded-lg bg-slate-200">{t.generateQuiz}</button>
              </div>
            </article>
          )}
          {quiz ? (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold">Quiz</h4>
              {quiz?.questions?.length ? quiz.questions.map((q, i)=> (
                <div key={i} className="p-3 rounded-lg border">
                  <p className="font-medium">{q.question}</p>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                    {q.options?.map((o, idx)=>(<li key={idx} className="p-2 rounded bg-slate-100">{o}</li>))}
                  </ul>
                  {q.explanation && <p className="text-sm text-slate-600 mt-2">{q.explanation}</p>}
                </div>
              )) : <p className="text-sm text-slate-500">{t.noQuiz}</p>}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
