import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import router from './routes/rem.routes.js'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
)

app.route('/api', router)

app.get('/', (c) => {
    return c.text('Real Estate API is running 🚀')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
