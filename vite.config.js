import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { onRequestGet } from './functions/api/content.js'

// Serve the same CMS endpoint in development and production previews as on Pages.
const serveContent = (server) => {
  server.middlewares.use(async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/content') return next()
    try {
      const response = await onRequestGet({ request: new Request(new URL(req.url, 'http://localhost')) })
      res.writeHead(response.status, Object.fromEntries(response.headers))
      res.end(await response.text())
    } catch (error) {
      next(error)
    }
  })
}

export default defineConfig({
  build: { ssrManifest: true },
  plugins: [vue(), tailwindcss(), {
    name: 'local-cms-content',
    configureServer: serveContent,
    configurePreviewServer: serveContent,
  }],
})
