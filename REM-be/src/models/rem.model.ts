import db from '../config/db.js'

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.map(String) : value.split(',').map((s) => s.trim())
    } catch {
      return value.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }
  return []
}

export function mapPropertyRow(row: Record<string, unknown>) {
  return {
    id: String(row.property_id),
    title: row.title,
    description: row.description ?? '',
    price: Number(row.price),
    location: row.location ?? '',
    bedrooms: Number(row.bedrooms ?? 0),
    bathrooms: Number(row.bathrooms ?? 0),
    squareFeet: Number(row.square_feet ?? 0),
    imageUrl: row.image_url ?? '',
    type: row.type,
    status: row.status,
    createdDate: row.created_date,
    features: parseFeatures(row.features),
    agent: row.agent ?? '',
  }
}

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

// AUTH
export const loginUser = async (email: string, password: string) => {
  const [rows] = await db.query(
    'SELECT user_id, full_name, email, role FROM users WHERE email = ? AND password = ? LIMIT 1',
    [email, password]
  )
  return (rows as Record<string, unknown>[])[0] ?? null
}

// PROPERTIES
export const getProperties = async () => {
  const [rows] = await db.query('SELECT * FROM properties ORDER BY created_date DESC')
  return (rows as Record<string, unknown>[]).map(mapPropertyRow)
}

export const getPropertyById = async (id: string) => {
  const [rows] = await db.query('SELECT * FROM properties WHERE property_id = ?', [id])
  const row = (rows as Record<string, unknown>[])[0]
  return row ? mapPropertyRow(row) : null
}

export const createProperty = async (data: Record<string, unknown>) => {
  const features = JSON.stringify(data.features ?? [])

  const [result] = await db.query(
    `INSERT INTO properties 
     (title, description, price, location, bedrooms, bathrooms, square_feet, image_url, type, status, features, agent, created_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      data.title,
      data.description,
      data.price,
      data.location,
      data.bedrooms,
      data.bathrooms,
      data.squareFeet,
      data.imageUrl,
      data.type,
      data.status,
      features,
      data.agent,
    ]
  )

  const insertId = (result as { insertId: number }).insertId
  return getPropertyById(String(insertId))
}

export const updateProperty = async (id: string, data: Record<string, unknown>) => {
  const features = JSON.stringify(data.features ?? [])

  await db.query(
    `UPDATE properties SET
      title = ?, description = ?, price = ?, location = ?,
      bedrooms = ?, bathrooms = ?, square_feet = ?, image_url = ?,
      type = ?, status = ?, features = ?, agent = ?
     WHERE property_id = ?`,
    [
      data.title,
      data.description,
      data.price,
      data.location,
      data.bedrooms,
      data.bathrooms,
      data.squareFeet,
      data.imageUrl,
      data.type,
      data.status,
      features,
      data.agent,
      id,
    ]
  )

  return getPropertyById(id)
}

export const deleteProperty = async (id: string) => {
  const [result] = await db.query('DELETE FROM properties WHERE property_id = ?', [id])
  return result
}