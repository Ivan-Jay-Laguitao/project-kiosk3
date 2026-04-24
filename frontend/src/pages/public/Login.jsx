//   const handleSubmit = async (e) => {
//   e.preventDefault()
//   setError('')
//   setIsLoading(true)

//   // ===== PHP BACKEND FETCH: Authenticate user =====
//   try {
//     const response = await fetch('backend/login.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         role: role,
//         idNumber: idNumber,
//         password: password
//       })
//     })
//     const data = await response.json()
//     if (data.success) {
//       onLogin({
//         name: data.user.name,
//         id: idNumber,
//         role: role,
//         department: data.user.department,
//         token: data.token // JWT token for authenticated requests
//       })
//     } else {
//       setError(data.message || 'Invalid credentials. Please try again.')
//     }
//   } catch (error) {
//     console.error('Login error:', error)
//     setError('Network error. Please check your connection and try again.')
//   }
//   // ===== END BACKEND FETCH =====
//   setIsLoading(false)
// }


import { useState } from 'react'
import msuiitLogo from '../../assets/msuiit-logo.png'

function Login({ onLogin, onAdminClick, onDeanClick }) {
  const [role, setRole] = useState('student')
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showAdminModal, setShowAdminModal] = useState(false)

  // === Mock login handler for demonstration ===
  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate login - in real app, validate against backend
    if (idNumber && password) {
      onLogin({
        name: 'Juan Dela Cruz',
        id: idNumber,
        role: role,
        department: 'College of Computer Studies'
      })
    }
  }
  // === END Mock login handler ===

  const handleLogoClick = () => {
    setShowAdminModal(true)
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <div 
          className="login-logo" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', position: 'relative' }}
          title="Click for Administrative Access"
        >
          <img src={msuiitLogo} alt="MSU-IIT Logo" />
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '10px',
            color: '#999',
            whiteSpace: 'nowrap'
          }}>
            🔒 Admin Access
          </div>
        </div>
        <h1>MSU-IIT Service Kiosk</h1>
        <p>Your One-Stop Hub for Campus Reports</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="role-selector">
          <label>Select Your Role:</label>
          <div className="role-buttons">
            <button 
              type="button"
              className={`role-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              🎓 Student
            </button>
            <button 
              type="button"
              className={`role-btn ${role === 'staff' ? 'active' : ''}`}
              onClick={() => setRole('staff')}
            >
              👔 Staff
            </button>
            <button 
              type="button"
              className={`role-btn ${role === 'faculty' ? 'active' : ''}`}
              onClick={() => setRole('faculty')}
            >
              📚 Faculty
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>ID Number / Email</label>
          <input 
            type="text"
            placeholder="e.g., 2022-XXXX or name@msuiit.edu.ph"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          🔐 Login to Dashboard
        </button>

        <div className="emergency-box">
          <h4>🚨 Emergency Hotlines</h4>
          <p>📞 Campus Security: (063) XXX-XXXX</p>
          <p>🔥 Fire Department: 160 / 221-9055</p>
          <p>🆘 National Emergency: 911</p>
        </div>
      </form>

      {/* ===== ADMIN/DEAN ACCESS MODAL ===== */}
      {showAdminModal && (
        <div className="review-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#4a0e0e', marginBottom: '10px' }}>
                🔐 Administrative Access
              </h3>
              <p style={{ color: '#666', marginBottom: '25px' }}>
                Select your administrative role to continue
              </p>
              
              <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                <button 
                  onClick={() => {
                    setShowAdminModal(false)
                    onAdminClick()
                  }}
                  className="submit-btn"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                    fontSize: '16px'
                  }}
                >
                  🛡️ Admin Dashboard
                  <span style={{ display: 'block', fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                    System Administration & Oversight
                  </span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowAdminModal(false)
                    onDeanClick()
                  }}
                  className="submit-btn"
                  style={{ 
                    background: 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
                    fontSize: '16px'
                  }}
                >
                  📚 Dean's Dashboard
                  <span style={{ display: 'block', fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                    College/Department Management
                  </span>
                </button>
              </div>

              <button 
                onClick={() => setShowAdminModal(false)}
                className="btn-secondary"
                style={{ marginTop: '20px', width: '100%' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login