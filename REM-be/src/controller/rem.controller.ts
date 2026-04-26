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