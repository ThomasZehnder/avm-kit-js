// copyPublicToData.js
const fs = require('fs');
const path = require('path');

const source = 'D:\\Arduino\\nuxt-palutech-arduino\\frontend-nuxt\\.output\\public';
const destination = 'D:\\Arduino\\nuxt-palutech-arduino\\arduino-nuxt\\data';

// Recursively copy files and folders
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Remove folder recursively if it exists
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }
}

try {
  console.log(`🧹 Removing existing destination folder:\n${destination}`);
  deleteFolderRecursive(destination);

  console.log(`📁 Copying from:\n${source}\n→\n${destination}`);
  copyRecursive(source, destination);

  console.log('✅ Copy completed successfully!');
} catch (err) {
  console.error('❌ Error:', err);
}
