import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar'

function App(){
    return(
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default App