import { useState } from 'react'

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Dela Cruz', role: 'Student', department: 'CCS', email: 'juan@msuiit.edu.ph', status: 'active' },
    { id: 2, name: 'Maria Clara', role: 'Student', department: 'CSM', email: 'maria@msuiit.edu.ph', status: 'active' },
    { id: 3, name: 'Dr. Santos', role: 'Faculty', department: 'COE', email: 'santos@msuiit.edu.ph', status: 'active' },
    { id: 4, name: 'Prof. Reyes', role: 'Faculty', department: 'CED', email: 'reyes@msuiit.edu.ph', status: 'inactive' },
    { id: 5, name: 'Mr. Garcia', role: 'Staff', department: 'Admin', email: 'garcia@msuiit.edu.ph', status: 'active' }
  ])

  const toggleUserStatus = (userId) => {
    // ===== PHP BACKEND FETCH: Toggle user status =====
    // try {
    //   await fetch('backend/toggle_user_status.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userId })
    //   })
    // } catch (error) {
    //   console.error('Update error:', error)
    // }
    // ===== END BACKEND FETCH =====

    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ))
  }

  return (
    <div className="admin-users">
      <div className="admin-section-header">
        <h3>👥 User Management</h3>
        <div className="admin-header-actions">
          <button className="admin-action-btn add-user-btn">➕ Add User</button>
          <button className="admin-action-btn">📊 Export Users</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><strong>{user.name}</strong></td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`user-status ${user.status}`}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className={`action-btn ${user.status === 'active' ? 'deactivate-btn' : 'activate-btn'}`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="action-btn edit-btn">✏️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers