import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/Mohithsai Malla/.gemini/antigravity/brain/cff265d6-6700-4d41-a668-ad0601c90b86';
const uploadedDir = path.join(brainDir, '.user_uploaded');
const publicDir = path.resolve(__dirname, 'public/images');
const insightsDir = path.resolve(publicDir, 'insights');

function syncImages() {
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(insightsDir)) {
      fs.mkdirSync(insightsDir, { recursive: true });
    }

    const mapping = [
      // Vistex AI Generated Image
      {
        srcList: [
          path.join(brainDir, 'vistex_consulting_graphic_1789137658595.jpg'),
          path.join(uploadedDir, 'media_1789136606758.png'),
        ],
        dest: path.join(publicDir, 'vistex-feature.png'),
      },
      // Insight 1: AI Enterprise Tech
      {
        srcList: [
          path.join(brainDir, 'ai_enterprise_tech_1789137684513.jpg'),
          path.join(uploadedDir, 'media_1789136491361.jpg'),
        ],
        dest: path.join(insightsDir, 'insight-1.jpg'),
      },
      // Insight 2: Flexible Staffing
      {
        srcList: [
          path.join(brainDir, 'flexible_tech_staffing_1789137709365.jpg'),
          path.join(uploadedDir, 'media_1789136503537.jpg'),
        ],
        dest: path.join(insightsDir, 'insight-2.jpg'),
      },
      // Insight 3: SAP Challenges
      {
        srcList: [
          path.join(uploadedDir, 'media_1789136498012.jpg'),
        ],
        dest: path.join(insightsDir, 'insight-3.jpg'),
      },
      // Insight 4: Remote Teams
      {
        srcList: [
          path.join(uploadedDir, 'media_1789136484269.png'),
        ],
        dest: path.join(insightsDir, 'insight-4.png'),
      },
    ];

    for (const item of mapping) {
      for (const src of item.srcList) {
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, item.dest);
          break;
        }
      }
    }
  } catch (err) {
    console.error('Image sync error:', err);
  }
}

// Execute immediately on config load
syncImages();

function copyUploadedAssetsPlugin() {
  return {
    name: 'copy-uploaded-assets',
    buildStart() {
      syncImages();
    },
    configureServer(server: any) {
      syncImages();
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/images/')) {
          const relativePath = req.url.replace(/^\/images\//, '');
          const localPath = path.join(publicDir, relativePath);
          if (fs.existsSync(localPath)) {
            const ext = path.extname(localPath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.webp': 'image/webp',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return fs.createReadStream(localPath).pipe(res);
          }
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyUploadedAssetsPlugin()],
});
