import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const uploadImage = async (file) => {
    if (!file) return null

    try {
      setUploading(true)
      setError(null)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  return { uploadImage, uploading, error }
}
