export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div className="container">
        <p style={styles.text}>
          © {currentYear} Madala Side Apparel · Pretoria, Soshanguve · South Africa
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    padding: '24px 20px',
    borderTop: '1px solid #222',
    background: '#000',
    textAlign: 'center',
  },
  text: {
    fontSize: '0.85rem',
    color: '#666',
    margin: 0,
  },
}
