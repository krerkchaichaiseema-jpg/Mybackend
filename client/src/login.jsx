import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login(){
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
        setFormData({
            ...formData,[event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage('')
        setLoading(true)

        try{
            const res = await axios.post('http://localhost:8000/login',formData,{ withCredentials:true} )
            setMessage(res.data.message)
            navigate('/Usersync')
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message)
        } else {
                setMessage('เกิดข้อผิดพลาด serverอาจมีปัญหา')
        }
    } finally {
        setLoading(false)
        }
    }
    return(
        <>
        <div className='login-container'>
        <div className='login-card'>
        <div className='login-title'>เข้าสู่ระบบ</div>
        <form onSubmit={handleSubmit}>
        
        <div className='form-group'>
        <label>Email</label>
        <div>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='form-input'
            />
            </div>
        </div>

        <div className='form-group'>
        <label>Password</label>
        <div>
            <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='form-input'
            />
            </div>
        </div>

        <button type="submit" disabled={loading} className='submit-btn'>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>

        <div 
            className="signup-text"
        >
        <div className="signup-link" onClick={() => navigate('/register')}>
            สมัครสมาชิก?
        </div>
        </div>

        {message && <p>{message}</p>}
        </form>
        </div>
        </div>
        </>
    )
}

export default Login