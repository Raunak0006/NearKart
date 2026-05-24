const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const rootDir = path.join(__dirname, '..');
const deployDir = path.join(rootDir, 'NearKart');

// Clean up old copied root static assets to avoid clutter
const rootClutter = [
  'customer', 'shopkeeper', 'login', 'signup', '_next', 'shops', '404', 
  '404.html', 'favicon.ico', 'logo.png', 'vercel.svg', 'window.svg', 
  'file.svg', 'globe.svg', 'next.svg', '__next.__PAGE__.txt', 
  '__next._full.txt', '__next._head.txt', '__next._index.txt', 
  '__next._tree.txt', 'index.txt', 'index.html'
];

rootClutter.forEach(item => {
  const itemPath = path.join(rootDir, item);
  if (fs.existsSync(itemPath)) {
    fs.rmSync(itemPath, { recursive: true, force: true });
  }
});

if (fs.existsSync(outDir)) {
  // Clear and prepare NearKart deploy subdirectory
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(deployDir, { recursive: true });

  // Copy compiled static files into NearKart subdirectory (for local Live Server on port 5500)
  fs.cpSync(outDir, deployDir, { recursive: true, force: true });
  console.log('Successfully synchronized static build files to /NearKart directory.');

  // Copy compiled static files directly to the root directory (for GitHub Pages hosting)
  fs.cpSync(outDir, rootDir, { recursive: true, force: true });
  console.log('Successfully synchronized static build files to the root directory for GitHub Pages.');
} else {
  console.error('Out directory not found. Please run next build first.');
}
