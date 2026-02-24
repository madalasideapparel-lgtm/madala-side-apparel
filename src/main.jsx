import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { supabase } from './lib/supabase'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Footer } from './pages/Footer'
import { AdminPanel } from './pages/AdminPanel'
import { Login } from './pages/Login'
import './styles/index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription?.unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = (user) => {
    setUser(user)
    setCurrentPage('admin')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setCurrentPage('home')
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#000', minHeight: '100vh' }}>
        <p style={{ color: '#999' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#000' }}>
      <Header
        isAdmin={!!user}
        onLogout={handleLogout}
        onAdminClick={() => setCurrentPage('admin')}
      />

      <main style={{ flex: 1 }}>
        {currentPage === 'admin' ? (
          user ? (
            <AdminPanel />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        ) : (
          <>
            <Home />
            <Shop />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
