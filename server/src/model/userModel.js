const { getDB } = require('../db/index')

const getAllUser = async () => {
    const conn = getDB()
    const results = await conn.query('SELECT * FROM dbuser')
    return results[0]
}

const createUser = async (user) => {
    const conn = getDB()
    const results = await conn.query('INSERT INTO dbuser SET ?',[user])
    return results[0].insertId
}

const getUserByID = async (id) => {
    const conn = getDB()
    const [results] = await conn.query('SELECT * FROM dbuser WHERE id = ?',[id])
    return results[0]
}

const updateUser = async (id,user) => {
    const conn = getDB()
    const results = await conn.query('UPDATE dbuser SET ? WHERE id = ?',[user, id])
    return results[0].affectedRows
}

const deleteUser = async (id) =>{
    const conn = getDB()
    const results = await conn.query('DELETE FROM dbuser WHERE id = ?',[id])
    return results[0].affectedRows
}


module.exports = {
    getAllUser,
    createUser,
    getUserByID,
    updateUser,
    deleteUser
}

