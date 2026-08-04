import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import './Usersync.css'

function Usersync(){
    const [todos,setTodos] = useState ({})
    const [isloading,setIsloading] = useState(true)

    const fetchTodo = async () =>{
        try {
            const response = await axios.get('http://localhost:8000/users/',{withCredentials: true})
            setTodos(response.data)
            setIsloading(false)
        } catch (error) {
            console.log('error',error)
        }
    }

    const deleteTodo = async (id) =>{
        try {
            setIsloading(true)
            const response = await axios.delete(`http://localhost:8000/users/id/${id}`,{withCredentials: true})
            await fetchTodo()
            setIsloading(false)
        } catch (error) {
            console.log('error',error)
        }
    }

    useEffect(()=>{
        fetchTodo()
    },[])

    return (
        <>
        <div className="usersync-container">
        { isloading && <div className="usersync-loading">Loading...</div>}
        { !isloading && <div>

            <Link to="/UserForm">
            <button className="add-user-btn" >
                สร้างรายชื่อ
            </button>
            </Link>

            <table className="user-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>ชื่อจริง</th>
                    <th>นามสกุล</th>
                    <th>อายุ</th>
                    <th>เพศ</th>
                    <th>แก้ไข/ลบ</th>
                </tr>
            </thead>
            <tbody>
            {
                todos.map((todo,index)=>(
                    <tr key={index}>
                        <td>{todo.id}</td>
                        <td>{todo.firstname}</td>
                        <td>{todo.lastname}</td>
                        <td>{todo.age}</td>
                        <td>{todo.gender}</td>
                        {/* {todo.address} */}
                        <td className="action-cell">
                        <Link to={`/todo/${todo.id}`}>
                        <button className="edit-btn">
                            Edit
                        </button>
                        </Link>
                        <button className="delete-btn" onClick={async ()=> { if (window.confirm(`ต้องการลบ ${todo.firstname} ${todo.lastname} ใช่หรือไม่?`)) {
                                await deleteTodo(todo.id)}}}>
                            delete
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
                </div>
            }       
        </div>
        </>
    )
}

export default Usersync