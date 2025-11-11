import Navbar from '../components/Navbar'

export default function Admin(){
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <h2 className="text-2xl font-bold mb-6">Admin Analytics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">AI Requests (24h)</p>
            <p className="text-3xl font-bold">—</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">Tokens Used</p>
            <p className="text-3xl font-bold">—</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">Active Students</p>
            <p className="text-3xl font-bold">—</p>
          </div>
        </div>
      </main>
    </div>
  )
}
