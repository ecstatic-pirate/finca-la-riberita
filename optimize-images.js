const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = './public/images';
const BACKUP_DIR = './public/images-backup';
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
const JPEG_QUALITY = 85;

async function optimizeImages() {
  try {
    // Create backup directory
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const backupPath = path.join(BACKUP_DIR, file);
      const outputPath = inputPath;
      
      try {
        // Get file stats
        const stats = await fs.stat(inputPath);
        const sizeMB = stats.size / (1024 * 1024);
        
        console.log(`Processing ${file} (${sizeMB.toFixed(2)}MB)...`);
        
        // Backup original
        await fs.copyFile(inputPath, backupPath);
        
        // Optimize image
        await sharp(inputPath)
          .resize(MAX_WIDTH, MAX_HEIGHT, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toFile(outputPath + '.tmp');
        
        // Replace original with optimized
        await fs.rename(outputPath + '.tmp', outputPath);
        
        // Get new size
        const newStats = await fs.stat(outputPath);
        const newSizeMB = newStats.size / (1024 * 1024);
        const reduction = ((sizeMB - newSizeMB) / sizeMB * 100).toFixed(1);
        
        console.log(`  ✓ Reduced to ${newSizeMB.toFixed(2)}MB (-${reduction}%)`);
        
      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error.message);
      }
    }
    
    console.log('\nOptimization complete!');
    console.log(`Original images backed up to: ${BACKUP_DIR}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the optimization
optimizeImages();