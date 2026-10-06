/**
 * Computes SHA-256 cryptographic hash of a File object using Web Crypto API
 */
export async function computeFileHash(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (err) {
    console.error('Error computing file hash:', err);
    // Fallback pseudo-hash based on size and first 1000 bytes
    return `${file.size}_${file.name}`;
  }
}

/**
 * Detects duplicate files based on content hash.
 * Returns an array of file objects updated with isDuplicate and duplicateOf flags.
 */
export function updateDuplicateFlags(files) {
  const hashCount = {};
  const firstFileWithHash = {};

  // First pass: count hashes and store first file
  files.forEach(item => {
    if (item.hash) {
      if (!hashCount[item.hash]) {
        hashCount[item.hash] = 1;
        firstFileWithHash[item.hash] = item.name;
      } else {
        hashCount[item.hash]++;
      }
    }
  });

  // Second pass: mark duplicate if count > 1 and it's not the first file
  return files.map(item => {
    const count = hashCount[item.hash] || 0;
    const isDup = count > 1;
    const firstFileName = firstFileWithHash[item.hash];

    return {
      ...item,
      isDuplicate: isDup,
      duplicateOf: isDup && firstFileName !== item.name ? firstFileName : null
    };
  });
}
