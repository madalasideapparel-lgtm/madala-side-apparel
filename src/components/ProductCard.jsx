export const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  return (
    <div style={styles.card}>
      {product.image_url && (
        <img src={product.image_url} alt={product.name} style={styles.image} />
      )}
      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>R{parseFloat(product.price).toFixed(2)}</span>
          {isAdmin && (
            <div style={styles.actions}>
              <button onClick={() => onEdit(product)} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={() => onDelete(product.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
  },
  name: {
    margin: '0 0 8px 0',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  description: {
    margin: '0 0 12px 0',
    fontSize: '0.9rem',
    color: '#999',
    minHeight: '40px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    padding: '6px 12px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: '6px 12px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
}
