import { useState } from 'react'

function DeanLogin({ onLogin, onBack }) {
  const [deanId, setDeanId] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const departments = [
    'College of Computer Studies (CCS)',
    'College of Science and Mathematics (CSM)',
    'College of Engineering (COE)',
    'College of Education (CED)',
    'College of Arts and Social Sciences (CASS)',
    'College of Economics, Business & Accountancy (CEBA)',
    'College of Health Sciences (CHS)'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // ===== PHP BACKEND FETCH: Dean authentication =====
    // try {
    //   const response = await fetch('backend/dean_login.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ deanId, password, department })
    //   })
    //   const data = await response.json()
    //   if (data.success) {
    //     onLogin({
    //       name: data.dean.name,
    //       id: deanId,
    //       role: 'dean',
    //       department: department,
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
      if (deanId && password && department) {
        onLogin({
          name: 'Dr. Roberto Lim',
          id: deanId,
          role: 'dean',
          department: department,
          position: 'Dean'
        })
      } else {
        setError('Please fill in all fields')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="admin-login-container dean-login">
      <div className="admin-login-card">
        <button onClick={onBack} className="back-arrow">
          ← Back
        </button>
        
        <div className="admin-login-header">
          <div className="admin-login-icon">📚</div>
          <h1>Dean's Dashboard</h1>
          <p>College/Department Management</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Department</label>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="dean-select"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Dean ID</label>
            <input 
              type="text"
              placeholder="Enter dean ID"
              value={deanId}
              onChange={(e) => setDeanId(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-btn dean-login-btn"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Authenticating...' : '📚 Access Dean Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeanLogin