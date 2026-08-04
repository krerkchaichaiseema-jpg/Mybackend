import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './UserForm.css'

function UserForm(){
    const navigate = useNavigate()

    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [age,setAge] = useState('')
    const [gender,setGender] = useState('')
    const [address,setAddress] = useState('')
    const [isloading,setIsloading] = useState(false)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
            setIsloading(true)
            const payload = {
                firstname,
                lastname,
                age: Number(age),
                gender,
                address
            }

            await axios.post('http://localhost:8000/users/',payload,{withCredentials: true})
            alert('สร้างรายชื่อสำเร็จ')
            navigate('/Usersync')
        } catch (error) {
            console.log('error',error)
        } finally {
            setIsloading(false)
        }
    }

    return (
        <>
        <div className="userform-container">
        <div className="userform-card">
        <div className="userform-title">เพิ่มรายชื่อผู้ใช้</div>

        { isloading && <div className="userform-loading">Loading...</div>}
        { !isloading &&
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ชื่อ</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(event)=>setFirstname(event.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>นามสกุล</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(event)=>setLastname(event.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>อายุ</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(event)=>setAge(event.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>เพศ</label>
                    <select 
                        value={gender} 
                        onChange={(event)=>setGender(event.target.value)} 
                        className="form-input"
                        required
                    >
                        <option value=""> เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>ที่อยู่</label>
                    <textarea
                        value={address}
                        onChange={(event)=>setAddress(event.target.value)}
                        className="form-input form-textarea"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    สร้างรายชื่อ
                </button>
            </form>
        }
        </div>
        </div>
        </>
    )
}

export default UserForm