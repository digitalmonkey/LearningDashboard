import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.resolve('./courses.json')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'courses-api',
      configureServer(server) {
        server.middlewares.use('/api/courses', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')

          if (req.method === 'GET') {
            if (fs.existsSync(DATA_FILE)) {
              res.end(fs.readFileSync(DATA_FILE, 'utf-8'))
            } else {
              res.end('null')
            }
          } else if (req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              fs.writeFileSync(DATA_FILE, body, 'utf-8')
              res.end('{"ok":true}')
            })
          } else {
            res.statusCode = 405
            res.end()
          }
        })
      },
    },
  ],
})
