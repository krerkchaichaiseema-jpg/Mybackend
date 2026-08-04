const express = require('express')
const router = express.Router()
const {
    getUsers,
    addUser,
    getUser,
    editUser,
    removeUser
} = require('../controller/userController')
const {
    register,
    login,
    logout,
    getme,
} = require('../controller/authController')

const userprotect = require('../middleware/authmiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', userprotect, getme)
router.get('/users',userprotect,getUsers)
router.post('/users',userprotect,addUser)
router.get('/users/id/:id',userprotect,getUser)
router.put('/users/id/:id',userprotect,editUser)
router.delete('/users/id/:id',userprotect,removeUser)

module.exports = router