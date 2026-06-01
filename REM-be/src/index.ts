import { Hono } from 'hono'
import routes from './routes/rem.routes.js'

const app = new Hono()

app.route('/api', routes)

app.get('/', (c) => {
  return c.text('Real Estate API is running 🚀')
})

export default app