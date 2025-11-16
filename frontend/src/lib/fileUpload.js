/**
 * Validate file type
 * @param {File} file - The file to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - Whether the file type is valid
 */
export function validateFileType(file, allowedTypes) {
  if (!file || !allowedTypes || allowedTypes.length === 0) return false;
  
  return allowedTypes.some(type => 
    type === "*" || 
    file.type === type || 
    (type.endsWith("/*") && file.type.startsWith(type.slice(0, -1)))
  );
}

/**
 * Validate file size
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} - Whether the file size is valid
 */
export function validateFileSize(file, maxSize) {
  if (!file || !maxSize) return false;
  
  return file.size <= maxSize;
}

/**
 * Convert file to base64
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 encoded string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onabort = () => reject(new Error("File reading was aborted"));
    
    reader.readAsDataURL(file);
  });
}

/**
 * Compress image file
 * @param {File} file - The image file to compress
 * @param {number} quality - Compression quality (0-1)
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<Blob>} - Compressed image blob
 */
export function compressImage(file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) {
  return new Promise((resolve, reject) => {
    // Only compress JPEG, PNG, or WebP images
    if (!file.type.match("image/(jpeg|png|webp)")) {
      resolve(file); // Return original file for unsupported formats
      return;
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to compress image"));
          }
        },
        file.type,
        quality
      );
    };
    
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}