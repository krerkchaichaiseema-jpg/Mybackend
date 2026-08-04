require('dotenv').config()
const mysql = require('mysql2/promise')

let connection = null

const connectDB = async () => {
        connection = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    })
    const conn = await connection.getConnection()
    console.log(`MySQL Connected: ${process.env.DB_HOST}`)
    conn.release()
}

const getDB = () => {
    if(!connection) throw new Error ('DB not connected')
        return connection
}

module.exports = { connectDB, getDB }
