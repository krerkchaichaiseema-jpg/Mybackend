const bcrypt = require('bcrypt')
const { getDB } = require('../db/index')
const generateToken = require('../utils/generatetoken') 



const register = async (req,res) => {
    try{
        const {username,email,password} = req.body
        if(!username|| !email || !password){
            return res.status(400).json({
                message:'กรอกข้อมูลให้ครบ'
            })
        }
        if(password.length<8){
            return res.status(400).json({
                message:'passwordต้องมีอย่างน้อย 8 ตัวอักษร'
            })
        }

        const [existing] = await getDB().query('SELECT id FROM dbauth WHERE email = ? OR username = ?',[email, username])
        if(existing.length > 0){
            return res.status(409).json({
                message:'username หรือ email ถูกไปแล้ว'
            })
        }

        // const hashpass = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, 10)

        const [result] = await getDB().query('INSERT INTO dbauth (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword])

        return res.status(201).json({
            message:'สมัครสมาชิกสำเร็จ',userId: result.insertId
        })
    }catch(error){
        console.error(error.message)
        return res.status(500).json({
            message:'เกิดข้อผิดพลาดฝั่งserver'
        })
    }
}

const login = async (req,res) =>{
    try{
        const {email,password} = req.body

        if( !email || !password ) {
            return res.status(400).json({
                message:'กรอก email และ password'
            })
        }

        const [userrows] = await getDB().query('SELECT * FROM dbauth WHERE email = ?',[email])

        if(userrows.length === 0 ){
            return res.status(401).json({
                message:'email หรือ password ไม่ถูกต้อง'
            })
        }

        const user = userrows[0]
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({
                message: 'email หรือ password ไม่ถูกต้อง'
            })
        }

        const token = generateToken({ id: user.id, username: user.username })
        console.log('Generated token:', token)

        res.cookie('token',token,{
            httpOnly: true,          
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',      
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({
            message : 'เข้าสู่ระบบสำเร็จ',
            user: {id: user.id, username: user.username, email: user.email},
            token : token
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({ 
            message: 'เกิดข้อผิดพลาดฝั่งserver' 
        })
    }
}

const logout = ( req , res ) => {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        return res.status(200).json({ 
            message: 'ออกจากระบบสำเร็จ' 
        })
    }

const getme = async(req,res) => {
        try{
            const [userrows] = await getDB().query('SELECT id,username, email, created_at FROM dbauth WHERE id = ?',[req.user.id])
            if(userrows.length === 0){
                return res.status(404).json({
                    message:'ไม่พบผู้ใช้'
                })
            }
            return res.status(200).json({user:userrows[0]})
    }catch(error){
        console.error(error)
        return res.status(500).json({ 
            message: 'เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์' 
        })
    }
}


module.exports = {
    register,
    login,
    logout,
    getme
}