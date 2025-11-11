import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

const API = import.meta.env.VITE_BACKEND_URL

export default function Courses(){
  const { t } = useI18n()
  const [courses, setCourses] = useState([])
  useEffect(()=>{ fetch(`${API}/courses`).then(r=>r.json()).then(setCourses).catch(()=>{}) }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <h2 className="text-2xl font-bold mb-6">{t.courses}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(c => (
            <article key={c.id} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-slate-600 mt-2 line-clamp-3">{c.description}</p>
            </article>
          ))}
          {courses.length === 0 && <p className="text-sm text-slate-500">No courses yet</p>}
        </div>
      </main>
    </div>
  )
}
