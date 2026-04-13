export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function filesToDataUrls(files = []) {
  return Promise.all(Array.from(files).map((file) => fileToDataUrl(file)));
}
