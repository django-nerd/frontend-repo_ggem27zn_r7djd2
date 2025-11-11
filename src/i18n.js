import { useEffect, useMemo, useState } from 'react'

export const translations = {
  en: {
    appName: 'AI LMS',
    home: 'Home',
    dashboard: 'Dashboard',
    courses: 'Courses',
    chatAI: 'AI Tutor',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    requestCode: 'Request Code',
    verify: 'Verify',
    code: 'Code',
    welcome: 'Learn faster with your AI study partner',
    getStarted: 'Get Started',
    explainInArabic: 'Explain in Arabic',
    generateQuiz: 'Generate Quiz',
    submit: 'Submit',
    yourScore: 'Your score',
    speak: 'Speak',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    rtl: 'RTL',
    ltr: 'LTR',
    leaderboard: 'Leaderboard',
    progress: 'Your Progress',
    noQuiz: 'No quiz yet — generate one',
    askAnything: 'Ask anything...',
  },
  ar: {
    appName: 'نظام التعلم بالذكاء الاصطناعي',
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    courses: 'الدورات',
    chatAI: 'المعلم الذكي',
    admin: 'الإدارة',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    requestCode: 'طلب رمز',
    verify: 'تحقق',
    code: 'الرمز',
    welcome: 'تعلّم أسرع مع رفيق الدراسة الذكي',
    getStarted: 'ابدأ الآن',
    explainInArabic: 'اشرح بالعربية',
    generateQuiz: 'إنشاء اختبار',
    submit: 'إرسال',
    yourScore: 'درجتك',
    speak: 'تحدّث',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    rtl: 'من اليمين لليسار',
    ltr: 'من اليسار لليمين',
    leaderboard: 'لوحة المتصدرين',
    progress: 'تقدّمك',
    noQuiz: 'لا يوجد اختبار — أنشئ واحدًا',
    askAnything: 'اسأل أي شيء...',
  },
}

export function useI18n() {
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en')
  const t = useMemo(() => translations[locale] || translations.en, [locale])
  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    localStorage.setItem('locale', locale)
  }, [locale])
  return { t, locale, setLocale }
}
