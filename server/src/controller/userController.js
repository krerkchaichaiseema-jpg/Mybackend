const { getAllUser,
        createUser,
        getUserByID,
        updateUser,
        deleteUser
 } = require('../model/userModel')

const getUsers = async (req,res) =>{
    try{
        const users = await getAllUser()
        res.json(users)
    }catch(error){
        console.error('Error fetching users:',error.message)
        res.status(500).json({
             error: 'Error fetching users' 
            })
    }
}

const addUser = async (req,res) =>{
    const data = req.body
    try{
        const userId = await createUser(data)
        res.status(201).json({message:'User created successfully',userId})
    }catch(error){
        console.error('Error creating user:',error.message)
        res.status(500).json({
            error:'Error creating user'
        })
    }
}

const getUser = async (req,res) => {
    const id = req.params.id
    // const data = req.body
    try {
        const user = await getUserByID(id)
        if(!user){
            return res.status(404).json({
                error:'User not found'
            })
        }
        res.json(user)
    } catch (error) {
        console.error('Error fetching user',error.message)
        res.status(500).json({
            error:'Error fetching user'
        })
    }
}

const editUser = async (req,res) =>{
    const id = req.params.id
    const data = req.body
    try{
        const affectedRows = await updateUser(id,data)
        if(affectedRows === 0){
            return res.status(404).json({error:'User not found'})
        }
            res.json({message:'User updating successfully',userId:id})
        }catch(error){
            console.error('Error updating user:',error.message)
            res.status(500).json({
                error:'Error updating user'
            })
        }
    }

const removeUser = async (req,res) =>{
    const id = req.params.id
    try {
        const affectedRows = await deleteUser(id)
        if(affectedRows === 0){
            return res.status(404).json({error:'User not found'})
        }
            res.json({message:'User deleted successfully',userId:id})
    } catch (error) {
        console.error('Error deleted user:',error.message)
        res.status(500).json({
            error:'Error deleted user!'
        })
    }
}


module.exports = { 
    getUsers,
    addUser,
    getUser,
    editUser,
    removeUser
}