import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './UserForm.css'

function Edit () {
    const { id } = useParams()
    const navigate = useNavigate()
    const [todo,setTodo] = useState ({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        address: ''
    })

    const fetchTodo = async (todoId) =>{
        try {
            const response = await axios.get(`http://localhost:8000/users/id/${todoId}`,{withCredentials: true})
            setTodo(response.data)
        } catch (error) {
            console.log('error',error)
        }
    }

    useEffect(()=>{
        fetchTodo(id)
    },[])
    
    function handleEditChange(event){
        const {name ,value} = event.target
        setTodo((previousState) => ({...previousState, 
            [name]:value
        }))
    }

    const updatename = async () =>{
        try {
            const response = await axios.put(`http://localhost:8000/users/id/${id}`,{
                firstname: todo.firstname,
                lastname: todo.lastname,
                age: todo.age,
                gender: todo.gender,
                address: todo.address,
            },
                {withCredentials: true}
            )
            await alert('อัพเดดสำเร็จ')
            await navigate('/Usersync')
        } catch (error) {
            console.log('error',error)
        }
    }

    return(
        <>
        <div className="userform-container">
        <div className="userform-card">
        <div className="userform-title">Hello Edit page { id }</div>
            <div className="form-group">
            <label>ชื่อ</label>
            <input 
            type='text'
            name='firstname' 
            onChange={handleEditChange}
            value={todo.firstname}
            className="form-input"/>
            </div>
            <div className="form-group">
            <label>นามสกุล</label>
            <input 
            type='text' 
            name='lastname' 
            onChange={handleEditChange}
            value={todo.lastname}
            className="form-input"/>
            </div>
            <div className="form-group">
            <label>อายุ</label>
            <input 
            type='text' 
            name='age'
            onChange={handleEditChange}
            value={todo.age}
            className="form-input"/>
            </div>
            <div className="form-group">
            <label>เพศ</label>
            <input 
            type='text'
            name='gender'
            onChange={handleEditChange}
            value={todo.gender}
            className="form-input"/>
            </div>
            <div className="form-group">
            <label>ที่อยู่</label>
            <input 
            type='text'
            name='address'
            onChange={handleEditChange}
            value={todo.address}
            className="form-input"/>
            </div>
            <button onClick={() => updatename()} className="submit-btn">Edit</button>
        </div>
        </div>
        </>
    )
}

export default Edit