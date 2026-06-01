import type { Context } from 'hono'
import * as model from '../models/rem.model.js'

// GET users
export const getUsers = async (c: Context) => {
  const data = await model.getUsers()
  return c.json(data)
}

// CREATE user
export const createUser = async (c: Context) => {
  const body = await c.req.json()
  const result = await model.createUser(body)
  return c.json(result)
}

// GET transactions
export const getTransactions = async (c: Context) => {
  const data = await model.getTransactions()
  return c.json(data)
}

// CREATE transaction
export const createTransaction = async (c: Context) => {
  const body = await c.req.json()
  const result = await model.createTransaction(body)
  return c.json(result)
}

// LOGIN
export const login = async (c: Context) => {
  const { email, password } = await c.req.json()
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  const user = await model.loginUser(email, password)
  if (!user) {
    return c.json({ error: 'Invalid email or password' }, 401)
  }

  return c.json({ user })
}

// PROPERTIES
export const getProperties = async (c: Context) => {
  const data = await model.getProperties()
  return c.json(data)
}

export const getPropertyById = async (c: Context) => {
  const id = c.req.param('id')
  const property = await model.getPropertyById(id)
  if (!property) {
    return c.json({ error: 'Property not found' }, 404)
  }
  return c.json(property)
}

export const createProperty = async (c: Context) => {
  const body = await c.req.json()
  const property = await model.createProperty(body)
  return c.json(property, 201)
}

export const updateProperty = async (c: Context) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const property = await model.updateProperty(id, body)
  if (!property) {
    return c.json({ error: 'Property not found' }, 404)
  }
  return c.json(property)
}

export const deleteProperty = async (c: Context) => {
  const id = c.req.param('id')
  await model.deleteProperty(id)
  return c.json({ success: true })
}