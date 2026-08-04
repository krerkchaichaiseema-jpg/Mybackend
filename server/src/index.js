const dotenv = require('dotenv')
require('dotenv').config()

const app = require('./app')
const { connectDB } = require('./db')

const PORT = process.env.PORT

const start = async () => {
    try{
    await connectDB()
    app.listen(PORT,()=>{
        console.log('http server run at ' + PORT)
    })
}catch(error){
    console.error('Failed to connect DB server')
        console.error(error.message)
    }
}
start()

