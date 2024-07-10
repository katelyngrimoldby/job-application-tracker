const encodeFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const decodeFile = async (dataUrl: string): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], 'file', { type: 'application/pdf' });
};

const encodeFiles = async (files: File[]): Promise<string[]> => {
  return await Promise.all(
    files.map(async (file) => {
      const fileBase64 = await encodeFile(file);
      return fileBase64;
    })
  );
};

const decodeFiles = async (urls: string[]): Promise<File[]> => {
  return await Promise.all(
    urls.map(async (url) => {
      const decodedFile = decodeFile(url);
      return decodedFile;
    })
  );
};

export { encodeFiles, decodeFiles };
