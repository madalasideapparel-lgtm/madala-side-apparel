export const Home = () => {
  return (
    <>
      <section style={styles.hero}>
        <div className="container">
          <h2 style={styles.heroHeading}>Streetwear From The Side That Raised Us</h2>
          <p style={styles.heroText}>
            Join the Madala Side movement and be part of a community that's shaping the future.
            The story untold.
          </p>
        </div>
      </section>

      <section id="about" style={styles.about}>
        <div className="container">
          <h2 style={styles.heading}>About Madala Side</h2>
          <p style={styles.text}>
            Born in Pretoria, Soshanguve, Madala Side Apparel is more than clothing. It's identity,
            roots, and pride. Every piece tells a story that was never told.
          </p>
        </div>
      </section>

      <section id="contact" style={styles.contact}>
        <div className="container">
          <h2 style={styles.heading}>Contact & Orders</h2>
          <p style={styles.text}>Place your order directly via WhatsApp</p>
          <div style={styles.contacts}>
            <a href="https://wa.me/27722241345" style={styles.contactLink}>
              <strong>Slime Bouy Kutlwano</strong>
              <span>072 224 1345</span>
            </a>
            <a href="https://wa.me/27761251730" style={styles.contactLink}>
              <strong>Wiizeyy & Teeman</strong>
              <span>076 148 3261 / 076 125 1730</span>
            </a>
            <a href="https://wa.me/27796061388" style={styles.contactLink}>
              <strong>Innocent</strong>
              <span>079 606 1388</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    padding: '80px 20px',
    background: '#111',
    textAlign: 'center',
  },
  heroHeading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '16px',
  },
  heroText: {
    fontSize: '1rem',
    color: '#ccc',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  about: {
    padding: '60px 20px',
  },
  contact: {
    padding: '60px 20px',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '24px',
  },
  text: {
    fontSize: '1rem',
    color: '#ccc',
    textAlign: 'center',
    marginBottom: '32px',
    maxWidth: '700px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6',
  },
  contacts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  contactLink: {
    padding: '16px',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'border-color 0.2s',
  },
}
