
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { userService } from './services/user.service'
import { HomePage } from './cmps/HomePage'
import { AdminPage } from './cmps/AdminPage'

function App() {
  function RouteGuard({ children }) {
    const loggedinUser = userService.getLoggedinUser()

    if (loggedinUser.name !== 'Dean') return <Navigate to="/" />
    return children
}


  return (
    <Router>
    
            <Routes>
                <Route element={<HomePage />} path="/"></Route>
             
                {/* <Route element={<CodePage />} path="/signin"></Route> */}
            
                <Route element={
                    <RouteGuard>
                        <AdminPage />
                    </RouteGuard>
                } path="/admin"></Route>
            </Routes>
        

    </Router>
  )
}

export default App
