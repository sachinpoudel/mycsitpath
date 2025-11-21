
import { supabase } from "../lib/supabase";
export const uploadFile = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("course-materials")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("course-materials")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
