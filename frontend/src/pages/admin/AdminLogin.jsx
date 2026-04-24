import { useState } from 'react'
import msuiitLogo from '../../assets/msuiit-logo.png'
import '../../styles/admin.css'

function AdminLogin({ onLogin, onBack }) {
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // ===== PHP BACKEND FETCH: Admin authentication =====
    // try {
    //   const response = await fetch('backend/admin_login.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ adminId, password })
    //   })
    //   const data = await response.json()
    //   if (data.success) {
    //     onLogin({
    //       name: data.admin.name,
    //       id: adminId,
    //       role: 'admin',
    //       accessLevel: data.admin.accessLevel,
    //       token: data.token
    //     })
    //   } else {
    //     setError(data.message || 'Invalid credentials')
    //   }
    // } catch (error) {
    //   console.error('Login error:', error)
    //   setError('Network error. Please try again.')
    // }
    // ===== END BACKEND FETCH =====

    // Mock authentication
    setTimeout(() => {
      if (adminId && password) {
        onLogin({
          name: 'Dr. Maria Santos',
          id: adminId,
          role: 'admin',
          position: 'System Administrator',
          accessLevel: 'full'
        })
      } else {
        setError('Please fill in all fields')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <button onClick={onBack} className="back-arrow">
          ← Back
        </button>
        
        <div className="admin-login-header">
          <div className="admin-login-icon">🛡️</div>
          <h1>Admin Dashboard</h1>
          <p>System Administration & Oversight</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Admin ID</label>
            <input 
              type="text"
              placeholder="Enter admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Authenticating...' : '🔐 Access Admin Dashboard'}
          </button>
        </form>

        <div className="admin-info-box">
          <p>🔒 Authorized personnel only</p>
          <p>All access is monitored and logged</p>
        </div>
      </div>
      <img src={msuiitLogo} alt="MSU-IIT logo" className="admin-logo" />
    </div>
  )
}

export default AdminLogin