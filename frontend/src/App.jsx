import { useState } from 'react'
import Login from './ui/Login'
import StudentDashboard from './ui/StudentDashboard'
import './styles/app.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <StudentDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App