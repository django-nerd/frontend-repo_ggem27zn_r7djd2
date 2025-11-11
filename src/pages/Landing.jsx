import Spline from '@splinetool/react-spline'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Landing() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <Navbar />
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            {t.welcome}
          </h1>
          <p className="mt-4 text-white/80">
            Courses, quizzes, certificates — powered by an AI tutor that speaks English and Arabic.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/dashboard" className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30">
              {t.getStarted}
            </Link>
            <Link to="/chat-ai" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20">
              {t.chatAI}
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />
      </section>
      <footer className="py-12 text-center text-white/60">© {new Date().getFullYear()} AI LMS</footer>
    </div>
  )
}
