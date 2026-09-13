import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function homepageCmsPlugin(): Plugin {
  return {
    name: 'homepage-cms-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // API Endpoint: GET /api/homepage-content
        if (req.method === 'GET' && url.startsWith('/api/homepage-content')) {
          const filePath = path.resolve(__dirname, 'public/data/homepage-content.json');
          if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Content file not found' }));
            return;
          }
        }

        // API Endpoint: POST /api/homepage-content
        if (req.method === 'POST' && url.startsWith('/api/homepage-content')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const json = JSON.parse(body);
              const dataDir = path.resolve(__dirname, 'public/data');
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              const filePath = path.resolve(dataDir, 'homepage-content.json');
              fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Homepage content updated successfully' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to save homepage content' }));
            }
          });
          return;
        }

        // API Endpoint: GET /api/inquiries
        if (req.method === 'GET' && url.startsWith('/api/inquiries')) {
          const filePath = path.resolve(__dirname, 'public/data/inquiries.json');
          if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            try {
              const inquiries = JSON.parse(data);
              inquiries.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ inquiries }));
              return;
            } catch {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ inquiries: [] }));
              return;
            }
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ inquiries: [] }));
            return;
          }
        }

        // API Endpoint: POST /api/inquiries
        if (req.method === 'POST' && url.startsWith('/api/inquiries')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { name, phone, email, service } = JSON.parse(body);
              if (!name || !phone || !email || !service) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'All fields (Name, Number, Email, Service) are required.' }));
                return;
              }

              const dataDir = path.resolve(__dirname, 'public/data');
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }

              const filePath = path.resolve(dataDir, 'inquiries.json');
              let inquiries: any[] = [];
              if (fs.existsSync(filePath)) {
                try {
                  inquiries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                } catch {
                  inquiries = [];
                }
              }

              const newInquiry = {
                id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim(),
                service: service.trim(),
                status: 'new',
                created_at: new Date().toISOString()
              };

              inquiries.unshift(newInquiry);
              fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, inquiry: newInquiry }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to submit inquiry' }));
            }
          });
          return;
        }

        // API Endpoint: PATCH /api/inquiries/status (or POST /api/inquiries/status)
        if ((req.method === 'PATCH' || req.method === 'POST') && url.startsWith('/api/inquiries/status')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { id, status } = JSON.parse(body);
              if (!id || !['new', 'contacted', 'resolved'].includes(status)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Valid inquiry ID and status are required.' }));
                return;
              }

              const filePath = path.resolve(__dirname, 'public/data/inquiries.json');
              if (!fs.existsSync(filePath)) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Inquiries database not found' }));
                return;
              }

              const inquiries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              const index = inquiries.findIndex((inq: any) => inq.id === id);
              if (index === -1) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Inquiry record not found' }));
                return;
              }

              inquiries[index].status = status;
              fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, inquiry: inquiries[index] }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to update inquiry status' }));
            }
          });
          return;
        }

        // API Endpoint: POST /api/upload-image
        if (req.method === 'POST' && url.startsWith('/api/upload-image')) {
          const chunks: Buffer[] = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              if (buffer.length > 10 * 1024 * 1024) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'File size exceeds 10MB limit' }));
                return;
              }

              let imageBuffer: Buffer = buffer;
              let ext = '.png';

              const bodyString = buffer.toString('utf-8');
              if (bodyString.trim().startsWith('{')) {
                const parsed = JSON.parse(bodyString);
                if (parsed.base64) {
                  const matches = parsed.base64.match(/^data:image\/([a-zA-Z0-9-+.]+);base64,(.+)$/);
                  if (matches) {
                    const format = matches[1].toLowerCase();
                    if (!['jpeg', 'jpg', 'png', 'webp', 'avif'].includes(format)) {
                      res.statusCode = 400;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'Unsupported image format. Allowed: JPG, PNG, WebP' }));
                      return;
                    }
                    ext = format === 'jpeg' ? '.jpg' : `.${format}`;
                    imageBuffer = Buffer.from(matches[2], 'base64');
                  }
                }
              } else {
                if (buffer[0] === 0xff && buffer[1] === 0xd8) ext = '.jpg';
                else if (buffer[0] === 0x89 && buffer[1] === 0x50) ext = '.png';
                else if (buffer.subarray(8, 12).toString() === 'WEBP') ext = '.webp';
              }

              const uploadsDir = path.resolve(__dirname, 'public/uploads');
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
              }

              const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
              const destPath = path.resolve(uploadsDir, filename);
              fs.writeFileSync(destPath, imageBuffer);

              const publicUrl = `/uploads/${filename}`;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: publicUrl, filename }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Image upload failed' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), homepageCmsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    },
  };
});
