import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Menu, MessageSquare, BookOpen, GraduationCap, LayoutDashboard, Languages, Globe2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function useI18n() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => ({
    en: {
      app: 'AI-Integrated LMS',
      tagline: 'Learn faster with an AI tutor, auto-generated lessons, quizzes, and instant feedback.',
      getStarted: 'Get Started',
      explore: 'Explore Features',
      dashboard: 'Dashboard',
      courses: 'Courses',
      chatAI: 'AI Tutor',
      admin: 'Admin',
      quiz: 'Quiz',
      login: 'Login',
      askAnything: 'Ask anything...',
      send: 'Send',
      generateLesson: 'Generate Lesson',
      prompt: 'Prompt',
      language: 'Language',
      arabic: 'Arabic',
      english: 'English',
      leaderboard: 'Leaderboard'
    },
    ar: {
      app: 'نظام إدارة التعلم المدعوم بالذكاء الاصطناعي',
      tagline: 'تعلّم أسرع مع معلم افتراضي، دروس واختبارات مولدة تلقائياً وتقييم فوري.',
      getStarted: 'ابدأ الآن',
      explore: 'استكشف المزايا',
      dashboard: 'لوحة التحكم',
      courses: 'الدورات',
      chatAI: 'المعلم الذكي',
      admin: 'الإدارة',
      quiz: 'اختبار',
      login: 'تسجيل الدخول',
      askAnything: 'اسأل أي شيء...',
      send: 'إرسال',
      generateLesson: 'توليد درس',
      prompt: 'الموجه',
      language: 'اللغة',
      arabic: 'العربية',
      english: 'الإنجليزية',
      leaderboard: 'لوحة المتصدرين'
    }
  }), [])
  const dict = t[lang]
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])
  return { lang, setLang, t: dict }
}

function Navbar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const nav = [
    { to: '/dashboard', label: t.dashboard, icon: <LayoutDashboard size={18} /> },
    { to: '/courses', label: t.courses, icon: <BookOpen size={18} /> },
    { to: '/chat-ai', label: t.chatAI, icon: <MessageSquare size={18} /> },
  ]
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0b1020]/70 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <GraduationCap className="text-blue-300" />
          <span>AI LMS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-blue-100/80 hover:text-white flex items-center gap-2">{n.icon}{n.label}</Link>
          ))}
          <LangSwitcher lang={lang} setLang={setLang} t={t} />
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}><Menu /></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0b1020] text-white">
          <div className="px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-blue-100/80 hover:text-white flex items-center gap-2" onClick={() => setOpen(false)}>{n.icon}{n.label}</Link>
            ))}
            <LangSwitcher lang={lang} setLang={setLang} t={t} />
          </div>
        </div>
      )}
    </header>
  )
}

function LangSwitcher({ lang, setLang, t }) {
  return (
    <div className="flex items-center gap-2">
      <Globe2 size={18} className="text-blue-200" />
      <select value={lang} onChange={(e)=>setLang(e.target.value)} className="bg-white/10 border border-white/20 rounded px-2 py-1">
        <option value="en">{t.english}</option>
        <option value="ar">{t.arabic}</option>
      </select>
    </div>
  )
}

function Hero({ t }) {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-[#0b1020] to-[#0a0f1a] text-white">
      <div className="absolute inset-0 opacity-60">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/60 via-[#0b1020]/40 to-[#0b1020]/90 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">{t.app}</motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}} className="mt-6 text-lg md:text-xl text-blue-100/80 max-w-2xl">{t.tagline}</motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}} className="mt-10 flex gap-4">
          <button onClick={()=>navigate('/dashboard')} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20">{t.getStarted}</button>
          <a href="#features" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur border border-white/20">{t.explore}</a>
        </motion.div>
      </div>
    </section>
  )
}

function Dashboard({ t }) {
  const [leaderboard, setLeaderboard] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE}/leaderboard`).then(r=>r.json()).then(setLeaderboard).catch(()=>{})
  },[])
  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">{t.dashboard}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">{t.leaderboard}</h3>
          <ul className="space-y-2">
            {leaderboard.map((u,i)=> (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-blue-100/90">{u.user_email}</span>
                <span className="text-blue-200">{u.score}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">AI</h3>
          <p className="text-blue-100/80">Use the AI Tutor to practice and get instant feedback.</p>
          <Link to="/chat-ai" className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">{t.chatAI}</Link>
        </div>
      </div>
    </div>
  )
}

function Courses() {
  const [courses, setCourses] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE}/courses`).then(r=>r.json()).then(setCourses).catch(()=>{})
  },[])
  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-blue-100/80 line-clamp-3">{c.description}</p>
            <Link to={`/lesson/${c.id}`} className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function LessonPage() {
  const { id } = useParams()
  const [lessons, setLessons] = useState([])
  useEffect(()=>{
    // Here we treat id as course id to list lessons
    fetch(`${API_BASE}/lessons?course_id=${id}`).then(r=>r.json()).then(setLessons).catch(()=>{})
  },[id])
  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <div className="space-y-4">
        {lessons.map(l => (
          <div key={l.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">{l.title}</h3>
            <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: l.content }} />
            <div className="mt-3 flex gap-3">
              <Link to={`/quiz/${l.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">Start Quiz</Link>
              <Link to={`/chat-ai?lesson=${l.id}`} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg">Ask AI</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizPage() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  useEffect(()=>{
    fetch(`${API_BASE}/quiz/by-lesson/${id}`).then(r=>r.json()).then(data=>{
      if (data.quiz) setQuiz(data.quiz)
      else fetch(`${API_BASE}/quiz/generate`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ lesson_id: id, num_questions: 5 })}).then(r=>r.json()).then(res=>setQuiz(res.quiz))
    }).catch(()=>{})
  },[id])
  if (!quiz) return <div className="container mx-auto px-6 py-10 text-white">Loading...</div>
  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <div className="space-y-6">
        {quiz.questions?.map((q, qi)=> (
          <div key={qi} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <p className="font-medium">{q.question}</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {(q.options || ['True','False']).map((opt, oi)=> (
                <label key={oi} className={`px-3 py-2 rounded border cursor-pointer ${answers[qi]===opt? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                  <input type="radio" name={`q-${qi}`} className="hidden" onChange={()=>setAnswers(a=>({...a,[qi]:opt}))} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl">Submit</button>
    </div>
  )
}

function ChatAI({ t, lang }) {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!message.trim()) return
    const h = [...history, { role: 'user', content: message }]
    setHistory(h)
    setMessage('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message, language: lang, history: h }) })
      const data = await res.json()
      const reply = data.reply || data.answer || JSON.stringify(data)
      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setHistory(prev => [...prev, { role: 'assistant', content: 'Error contacting AI service.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-bold mb-4">{t.chatAI}</h2>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-[60vh] overflow-y-auto space-y-3">
        {history.map((m,i)=> (
          <div key={i} className={`max-w-[80%] px-4 py-2 rounded ${m.role==='user'? 'bg-blue-600 ml-auto' : 'bg-white/10'}`}>{m.content}</div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={t.askAnything} className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20" />
        <button onClick={send} disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500">{loading? '...' : t.send}</button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-10 text-center text-blue-100/70">
      Built with love • © {new Date().getFullYear()}
    </footer>
  )
}

function Landing({ t }) {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <Hero t={t} />
      <section id="features" className="container mx-auto px-6 py-16 text-white grid md:grid-cols-3 gap-6">
        {[{title:'AI Tutor', icon: MessageSquare}, {title:'Courses', icon: BookOpen}, {title:'Dashboard', icon: LayoutDashboard}].map((f,i)=> (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <f.icon className="text-blue-300" />
            <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
            <p className="text-blue-100/80">Smart learning, instant feedback, and clean UI.</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  )
}

export default function App() {
  const { lang, setLang, t } = useI18n()
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/" element={<Landing t={t} />} />
        <Route path="/dashboard" element={<Dashboard t={t} />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/chat-ai" element={<ChatAI t={t} lang={lang} />} />
      </Routes>
    </div>
  )
}
