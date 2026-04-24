import { useState } from 'react'
//const [students, setStudents] = useState([
function DeanStudents({ department }) {
  const [students] = useState([
    { id: '2022-001', name: 'Juan Dela Cruz', year: '3rd Year', course: 'BS Computer Science', status: 'active', gpa: '3.5' },
    { id: '2022-002', name: 'Maria Clara', year: '2nd Year', course: 'BS Information Technology', status: 'active', gpa: '3.8' },
    { id: '2022-003', name: 'Jose Rizal', year: '4th Year', course: 'BS Computer Science', status: 'active', gpa: '3.2' },
    { id: '2022-004', name: 'Pedro Penduko', year: '3rd Year', course: 'BS Information Technology', status: 'probation', gpa: '2.5' }
  ])

  return (
    <div className="admin-users">
      <div className="admin-section-header">
        <h3>🎓 Department Students</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>{department}</p>
      </div>

      <div className="admin-stats-grid" style={{ marginBottom: '20px' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: '#1565c0' }}>450</div>
          <div className="admin-stat-label">Total Students</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: '#2e7d32' }}>425</div>
          <div className="admin-stat-label">Active Students</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: '#ed6c02' }}>15</div>
          <div className="admin-stat-label">On Probation</div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Course</th>
              <th>Status</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td><strong>{student.name}</strong></td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <span className={`user-status ${student.status}`}>
                    {student.status.toUpperCase()}
                  </span>
                </td>
                <td>{student.gpa}</td>
                <td>
                  <button className="action-btn view-btn">👁️ View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeanStudents