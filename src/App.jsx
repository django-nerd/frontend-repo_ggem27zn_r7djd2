import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import ChatAI from './pages/ChatAI'
import Admin from './pages/Admin'
import Lesson from './pages/Lesson'

export default function App(){
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/chat-ai" element={<ChatAI />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/lesson/:id" element={<Lesson />} />
    </Routes>
  )
}
