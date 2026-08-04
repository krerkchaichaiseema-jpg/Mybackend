import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Register(){
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    if (formData.password !== formData.confirmPassword) {
      setMessage('รหัสผ่านไม่ตรงกัน')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/register', formData)
      setMessage(res.data.message)
      navigate('/Usersync')
    } catch (error) {
      console.log('error', error)
      setMessage(error.response?.data?.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='login-container'>
      <div className='login-card'>
      <div className='login-title'>สมัครสมาชิก</div>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className='form-input'
          />
        </div>
        </div>

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

        <div className='form-group'>
          <label>ยืนยันรหัสผ่าน</label>
          <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className='form-input'
          />
          </div>
        </div>

        <button type="submit" disabled={loading} className='submit-btn'>
          {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
        </button>

        <div className="signup-text">
          <div className="signup-link" onClick={() => navigate('/')}>
            เข้าสู่ระบบ?
          </div>
        </div>

        {message && <p>{message}</p>}
      </form>
      </div>
      </div>
    </>
  )
}

export default Register