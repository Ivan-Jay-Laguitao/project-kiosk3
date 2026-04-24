import { useState } from 'react'
import msuiitLogo from '../assets/msuiit-logo.png'

function Login({ onLogin }) {
  const [role, setRole] = useState('student')
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')

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

//  === Mock login handler for demonstration (replace with actual backend authentication) ===
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

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-logo">
          <img src={msuiitLogo} alt="MSU-IIT Logo" />
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
    </div>
  )
}

export default Login