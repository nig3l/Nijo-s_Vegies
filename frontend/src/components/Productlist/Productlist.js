import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ProductList = () => {
  const supabase = useSupabaseClient();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
        
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      
      setProducts(data);
    };

    fetchProducts();
  }, [supabase]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={{
            ...product,
            image: product.image_url
          }} 
        />
      ))}
    </div>
  );
};
export default ProductList;