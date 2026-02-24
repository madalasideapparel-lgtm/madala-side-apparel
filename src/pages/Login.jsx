import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        onLoginSuccess(data.user)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="admin@example.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.note}>
          Contact an administrator for login credentials.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '32px',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '24px',
    textAlign: 'center',
  },
  error: {
    padding: '12px',
    background: '#7f1d1d',
    color: '#fca5a5',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontWeight: '500',
    fontSize: '0.9rem',
    color: '#ccc',
  },
  input: {
    padding: '10px 12px',
    background: '#000',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.9rem',
  },
  submitBtn: {
    padding: '12px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  note: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#999',
    marginTop: '16px',
  },
}
