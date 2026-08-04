import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './navbar.css'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout', {}, { withCredentials: true })
        } catch (error) {
            console.log('error', error)
        } finally {
            navigate('/')
        }
    }

    return (
        <nav className="navbar">
            <button className="navbar-btn navbar-home" onClick={() => navigate('/Usersync')}>
                Home
            </button>
            <button className="navbar-btn navbar-logout" onClick={handleLogout}>
                ออกจากระบบ
            </button>
        </nav>
    )
}

export default Navbar