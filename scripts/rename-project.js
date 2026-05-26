const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'lib', 'scripts'];
const targetFiles = ['next.config.ts', 'package.json', 'README.md'];
const rootDir = path.join(__dirname, '..');

// Helper to recursively process directories
function processDir(dirPath) {
  const items = fs.readdirSync(dirPath);
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        processDir(itemPath);
      }
    } else {
      const ext = path.extname(itemPath);
      if (['.ts', '.tsx', '.js', '.json', '.css', '.md'].includes(ext)) {
        processFile(itemPath);
      }
    }
  });
}

// Helper to process individual files
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Case-preserving replacements
  // 1. Path variables / subfolder references
  content = content.replace(/\/RaashanKart\//g, '/RaashanKart/');
  content = content.replace(/\/RaashanKart/g, '/RaashanKart');
  content = content.replace(/\\RaashanKart/g, '\\RaashanKart');
  
  // 2. Class names, variables, titles
  content = content.replace(/RaashanKart/g, 'RaashanKart');
  content = content.replace(/raashankart/g, 'raashankart');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

// Run replacements
console.log('Starting project-wide rename from RaashanKart to RaashanKart...');
targetFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    processFile(filePath);
  }
});

targetDirs.forEach(dir => {
  const dirPath = path.join(rootDir, dir);
  if (fs.existsSync(dirPath)) {
    processDir(dirPath);
  }
});
console.log('Project-wide renaming completed successfully.');
