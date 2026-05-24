const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const rootDir = path.join(__dirname, '..');

if (fs.existsSync(outDir)) {
  fs.cpSync(outDir, rootDir, { recursive: true, force: true });
  console.log('Successfully synchronized static build files to workspace root directory.');
} else {
  console.error('Out directory not found. Please run next build first.');
}
