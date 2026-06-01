import db from './src/config/db.js'

async function checkSchema() {
  try {
    console.log("--- TABLES ---")
    const [tables] = await db.query('SHOW TABLES')
    console.log(tables)

    for (const tableObj of (tables as any[])) {
      const tableName = Object.values(tableObj)[0]
      console.log(`\n--- DESCRIBE ${tableName} ---`)
      const [columns] = await db.query(`DESCRIBE ${tableName}`)
      console.log(columns)
    }

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

checkSchema()
