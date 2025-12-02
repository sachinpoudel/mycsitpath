import { supabase } from '../lib/supabase';

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const BUCKET_NAME = 'course-materials'; 
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase Upload Error:', error);
      throw new Error(error.message || 'Upload failed');
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error('Unexpected upload error:', error);
    throw new Error(error.message || 'Unexpected upload error');
  }
};

const { data: files } = await supabase.storage
  .from('course-materials')
  .list("pdfs");

export const pdfUrls = files.map(file => 
  supabase.storage
    .from('course-materials')
    .getPublicUrl(`pdfs/${file.name}`).data.publicUrl
);
