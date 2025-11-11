import { useI18n } from '../i18n'
import { Link } from 'react-router-dom'
import { Menu, Languages } from 'lucide-react'

export default function Navbar() {
  const { t, locale, setLocale } = useI18n()
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="text-blue-700">{t.appName}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/dashboard" className="hover:text-blue-600">{t.dashboard}</Link>
          <Link to="/courses" className="hover:text-blue-600">{t.courses}</Link>
          <Link to="/chat-ai" className="hover:text-blue-600">{t.chatAI}</Link>
          <Link to="/admin" className="hover:text-blue-600">{t.admin}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            <Languages size={16} /> {locale === 'en' ? t.arabic : t.english}
          </button>
          <button className="md:hidden p-2 rounded-md hover:bg-black/5"><Menu /></button>
        </div>
      </div>
    </header>
  )
}
