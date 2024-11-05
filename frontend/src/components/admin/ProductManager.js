import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { uploadProductImage } from '../../utils/supabaseStorage';

const ProductManager = () => {
  const supabase = useSupabaseClient();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Upload image first
      const imageUrl = await uploadProductImage(productData.image);
      
      // Insert product data with image URL
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productData.name,
            price: parseFloat(productData.price),
            image_url: imageUrl
          }
        ]);

      if (error) throw error;
      
      // Reset form
      setProductData({
        name: '',
        price: '',
        image: null
      });
      
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={productData.name}
        onChange={(e) => setProductData({...productData, name: e.target.value})}
        placeholder="Product Name"
      />
      <input
        type="number"
        value={productData.price}
        onChange={(e) => setProductData({...productData, price: e.target.value})}
        placeholder="Price"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProductData({...productData, image: e.target.files[0]})}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductManager;
