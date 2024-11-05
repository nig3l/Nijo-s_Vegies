import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const uploadProductImage = async (file) => {
  const supabase = useSupabaseClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { publicURL } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicURL;
};
