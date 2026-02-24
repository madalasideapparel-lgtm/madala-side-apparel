import { useState, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import { useImageUpload } from '../hooks/useImageUpload'

export const ProductForm = ({ product, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: 0,
    image_url: '',
  })

  const [previewUrl, setPreviewUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const { uploadImage, uploading } = useImageUpload()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (product) {
      setFormData(product)
      setPreviewUrl(product.image_url)
    }
  }, [product])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreviewUrl(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      let imageUrl = formData.image_url

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
        if (!imageUrl) {
          setError('Failed to upload image')
          return
        }
      }

      onSubmit({
        ...formData,
        image_url: imageUrl,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      })

      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock: 0,
        image_url: '',
      })
      setPreviewUrl(null)
      setSelectedFile(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.formGroup}>
        <label style={styles.label}>Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={styles.input}
          placeholder="e.g., Madala Side T-Shirt"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={styles.textarea}
          placeholder="Product description"
          rows={3}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price (R)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            style={styles.input}
            placeholder="0.00"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            style={styles.input}
            placeholder="0"
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          style={styles.input}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Product Image</label>
        <div style={styles.uploadBox}>
          {previewUrl ? (
            <div style={styles.previewContainer}>
              <img src={previewUrl} alt="Preview" style={styles.preview} />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null)
                  setSelectedFile(null)
                  setFormData({ ...formData, image_url: '' })
                }}
                style={styles.removeBtn}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label style={styles.uploadLabel}>
              <Upload size={24} />
              <span>Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
      </div>

      <div style={styles.actions}>
        <button type="submit" disabled={uploading} style={styles.submitBtn}>
          {uploading ? 'Uploading...' : product ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  error: {
    padding: '12px',
    background: '#7f1d1d',
    color: '#fca5a5',
    borderRadius: '4px',
    fontSize: '0.9rem',
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
  textarea: {
    padding: '10px 12px',
    background: '#000',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  uploadBox: {
    border: '2px dashed #333',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#999',
  },
  previewContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  preview: {
    maxHeight: '200px',
    borderRadius: '6px',
  },
  removeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  submitBtn: {
    flex: 1,
    padding: '12px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
