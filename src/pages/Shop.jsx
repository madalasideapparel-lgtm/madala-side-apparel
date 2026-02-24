import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ProductCard } from '../components/ProductCard'

export const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products

  return (
    <section id="shop" style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>Shop Our Collection</h2>

        {categories.length > 0 && (
          <div style={styles.filterContainer}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                ...styles.filterBtn,
                ...(selectedCategory === null ? styles.filterBtnActive : {}),
              }}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedCategory === cat.id ? styles.filterBtnActive : {}),
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p style={styles.loading}>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p style={styles.empty}>
            {selectedCategory ? 'No products in this category' : 'No products available yet'}
          </p>
        ) : (
          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} isAdmin={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '60px 20px',
    background: '#000',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '32px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '10px 18px',
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: '#fff',
    color: '#000',
    borderColor: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  loading: {
    textAlign: 'center',
    color: '#999',
    padding: '40px 0',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '40px 0',
  },
}
