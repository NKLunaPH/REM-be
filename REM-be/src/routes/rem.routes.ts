import { Hono } from 'hono'
import * as controller from '../controller/rem.controller.js'

const router = new Hono()

// USERS
router.get('/users', controller.getUsers)
router.post('/users', controller.createUser)

// TRANSACTIONS
router.get('/transactions', controller.getTransactions)
router.post('/transactions', controller.createTransaction)

// AUTH
router.post('/auth/login', controller.login)

// PROPERTIES
router.get('/properties', controller.getProperties)
router.get('/properties/:id', controller.getPropertyById)
router.post('/properties', controller.createProperty)
router.put('/properties/:id', controller.updateProperty)
router.delete('/properties/:id', controller.deleteProperty)

export default router