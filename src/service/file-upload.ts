import supabase from './supabase';

export async function uploadFile(file: File) {
  const fileName = `${Number(Math.random() * 1000).toFixed(0)}-${file.name}`;
  const { error: storageError } = await supabase.storage.from('images').upload(fileName, file);
  if (storageError) throw new Error(storageError.message);
  return supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
}

export async function deleteFile(url: string) {
  const { error: storageError, data } = await supabase.storage
    .from('images')
    .remove([url.split('images/').reverse()[0]]);
  if (storageError) throw new Error(storageError.message);
  console.log(data);
}
