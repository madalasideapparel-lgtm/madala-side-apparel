import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ProductForm } from '../components/ProductForm'
import { ProductCard } from '../components/ProductCard'

export const AdminPanel = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newCategory, setNewCategory] = useState('')

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
      setError(err.message)
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
      setError(err.message)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newCategory }])

      if (error) throw error
      setNewCategory('')
      fetchCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData])

        if (error) throw error
      }

      fetchProducts()
      setEditingProduct(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <h2 style={styles.heading}>Manage Products</h2>

        {error && <div style={styles.error}>{error}</div>}

        {showForm && (
          <div style={styles.formSection}>
            <h3 style={styles.subheading}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <ProductForm
              product={editingProduct}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
            />
          </div>
        )}

        <div style={styles.categoriesSection}>
          <h3 style={styles.subheading}>Categories</h3>
          <form onSubmit={handleAddCategory} style={styles.categoryForm}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              style={styles.categoryInput}
            />
            <button type="submit" style={styles.categoryBtn}>
              Add Category
            </button>
          </form>
          <div style={styles.categoriesList}>
            {categories.map((cat) => (
              <span key={cat.id} style={styles.categoryTag}>
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {!showForm && (
          <button onClick={() => setShowForm(true)} style={styles.addBtn}>
            + Add New Product
          </button>
        )}

        <div style={styles.productsSection}>
          <h3 style={styles.subheading}>
            Products ({products.length})
          </h3>
          {loading ? (
            <p style={styles.loading}>Loading products...</p>
          ) : products.length === 0 ? (
            <p style={styles.empty}>No products yet. Add one to get started!</p>
          ) : (
            <div style={styles.grid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isAdmin={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 0',
    minHeight: 'calc(100vh - 200px)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '32px',
  },
  error: {
    padding: '12px',
    background: '#7f1d1d',
    color: '#fca5a5',
    borderRadius: '4px',
    marginBottom: '24px',
  },
  formSection: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
  },
  subheading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  categoriesSection: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
  },
  categoryForm: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  categoryInput: {
    flex: 1,
    padding: '10px 12px',
    background: '#000',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.9rem',
  },
  categoryBtn: {
    padding: '10px 16px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  categoriesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  categoryTag: {
    padding: '6px 12px',
    background: '#0d0d0d',
    border: '1px solid #444',
    borderRadius: '20px',
    fontSize: '0.85rem',
  },
  addBtn: {
    padding: '12px 24px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '32px',
    fontSize: '0.95rem',
  },
  productsSection: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
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
