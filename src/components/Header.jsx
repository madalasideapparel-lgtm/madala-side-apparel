import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'

export const Header = ({ isAdmin, onLogout, onAdminClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <h1 style={styles.title}>Madala Side</h1>
          <p style={styles.subtitle}>The Story Untold</p>
        </div>

        <nav style={styles.nav}>
          <a href="#shop" style={styles.navLink}>Shop</a>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
          {isAdmin && (
            <button onClick={onAdminClick} style={styles.adminBtn}>
              Admin
            </button>
          )}
          {!isAdmin && (
            <button onClick={() => window.location.href = '/admin'} style={styles.adminBtn}>
              Admin
            </button>
          )}
        </nav>

        {isAdmin && (
          <button onClick={onLogout} style={styles.logoutBtn} title="Logout">
            <LogOut size={20} />
          </button>
        )}
      </div>
    </header>
  )
}

const styles = {
  header: {
    borderBottom: '1px solid #333',
    background: '#000',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 20px',
  },
  brand: {
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    letterSpacing: '2px',
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '0.8rem',
    color: '#999',
    fontStyle: 'italic',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  adminBtn: {
    padding: '8px 16px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  logoutBtn: {
    background: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  },
}
