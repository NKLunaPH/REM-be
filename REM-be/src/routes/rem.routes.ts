import { Hono } from 'hono'
import * as controller from '../controller/rem.controller.js'

const router = new Hono()

// USERS
router.get('/users', controller.getUsers)
router.post('/users', controller.createUser)

// TRANSACTIONS
router.get('/transactions', controller.getTransactions)
router.post('/transactions', controller.createTransaction)

export default router