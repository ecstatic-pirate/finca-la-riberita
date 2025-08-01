import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images');
    const files = fs.readdirSync(imagesDirectory);
    
    const mediaFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov'].includes(ext);
      })
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
        
        // Determine category based on filename patterns or distribute evenly
        let category = 'details';
        const fileIndex = files.indexOf(file);
        
        // Distribute images across categories if no pattern matches
        if (file.toLowerCase().includes('ceremony') || file.toLowerCase().includes('outdoor')) {
          category = 'ceremony';
        } else if (file.toLowerCase().includes('reception') || file.toLowerCase().includes('interior') || file.toLowerCase().includes('hall')) {
          category = 'reception';
        } else {
          // Distribute remaining images across categories
          const categories = ['ceremony', 'reception', 'details'];
          category = categories[fileIndex % 3];
        }
        
        return {
          src: `/images/${file}`,
          alt: file.replace(/\.[^/.]+$/, '').replace(/-|_/g, ' '),
          category,
          type: isVideo ? 'video' : 'image'
        };
      });
    
    return NextResponse.json(mediaFiles);
  } catch (error) {
    console.error('Error reading gallery files:', error);
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}