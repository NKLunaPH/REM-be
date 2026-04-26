import db from '../config/db.js'

// GET all users
export const getUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
}

// CREATE user
export const createUser = async (data: any) => {
    const { full_name, email, password, phone, role } = data

    const [result] = await db.query(
        `INSERT INTO users (full_name, email, password, phone, role)
     VALUES (?, ?, ?, ?, ?)`,
        [full_name, email, password, phone, role]
    )

    return result
}

// GET transactions (JOIN 🔥)
export const getTransactions = async () => {
    const [rows] = await db.query(`
    SELECT t.*, 
           p.title AS property,
           u.full_name AS buyer
    FROM transactions t
    JOIN properties p ON t.property_id = p.property_id
    JOIN users u ON t.buyer_id = u.user_id
  `)

    return rows
}

// CREATE transaction
export const createTransaction = async (data: any) => {
    const { property_id, buyer_id, agent_id, transaction_type, amount, transaction_date } = data

    const [result] = await db.query(
        `INSERT INTO transactions 
     (property_id, buyer_id, agent_id, transaction_type, amount, transaction_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [property_id, buyer_id, agent_id, transaction_type, amount, transaction_date]
    )

    return result
}