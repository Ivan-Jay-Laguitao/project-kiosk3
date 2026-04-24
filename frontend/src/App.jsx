import { useState } from 'react'
import Login from './pages/public/Login'
import StudentDashboard from './pages/public/StudentDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import DeanLogin from './pages/dean-dept/DeanLogin'
import DeanDashboard from './pages/dean-dept/DeanDashboard'
import './styles/app.css'

function App() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'student', 'admin-login', 'admin', 'dean-login', 'dean'
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('student')
  }

  const handleAdminLogin = (adminData) => {
    setUser(adminData)
    setCurrentView('admin')
  }

  const handleDeanLogin = (deanData) => {
    setUser(deanData)
    setCurrentView('dean')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  const navigateTo = (view) => {
    setCurrentView(view)
  }

  return (
    <div className="app">
      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin} 
          onAdminClick={() => navigateTo('admin-login')}
          onDeanClick={() => navigateTo('dean-login')}
        />
      )}
      
      {currentView === 'student' && (
        <StudentDashboard 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
      
      {currentView === 'admin-login' && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onBack={() => navigateTo('login')}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard 
          user={user} 
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'dean-login' && (
        <DeanLogin 
          onLogin={handleDeanLogin}
          onBack={() => navigateTo('login')}
        />
      )}
      
      {currentView === 'dean' && (
        <DeanDashboard 
          user={user} 
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App