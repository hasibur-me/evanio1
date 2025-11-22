import express from 'express';
import { generateAPIDocumentation } from '../utils/apiDocumentation.js';

const router = express.Router();

// API Documentation endpoint
router.get('/', (req, res) => {
  const docs = generateAPIDocumentation();
  res.json(docs);
});

// HTML documentation page
router.get('/html', (req, res) => {
  const docs = generateAPIDocumentation();
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Evanio API Documentation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #1a1a1a; color: #fff; }
        .endpoint { background: #2a2a2a; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .method { display: inline-block; padding: 5px 10px; border-radius: 3px; margin-right: 10px; }
        .get { background: #4CAF50; }
        .post { background: #2196F3; }
        .put { background: #FF9800; }
        .delete { background: #f44336; }
        .path { font-family: monospace; color: #60a5fa; }
        h1 { color: #60a5fa; }
        h2 { color: #34d399; margin-top: 30px; }
      </style>
    </head>
    <body>
      <h1>Evanio API Documentation</h1>
      <p>Version: ${docs.info.version}</p>
      <p>${docs.info.description}</p>
      
      <h2>Authentication</h2>
      <p>Most endpoints require authentication via JWT token in the Authorization header:</p>
      <code>Authorization: Bearer YOUR_TOKEN</code>
      
      <h2>Endpoints</h2>
      ${Object.entries(docs.paths).map(([path, methods]) => `
        <div class="endpoint">
          ${Object.entries(methods).map(([method, details]) => `
            <span class="method ${method}">${method.toUpperCase()}</span>
            <span class="path">${path}</span>
            <p><strong>${details.summary}</strong></p>
            ${details.tags ? `<p>Tags: ${details.tags.join(', ')}</p>` : ''}
          `).join('')}
        </div>
      `).join('')}
      
      <h2>Base URL</h2>
      <p>${docs.servers[0].url}</p>
    </body>
    </html>
  `;
  res.send(html);
});

export default router;


