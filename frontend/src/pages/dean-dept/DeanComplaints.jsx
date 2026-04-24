import { useState } from 'react'
//const [complaints, setComplaints] = useState([
function DeanComplaints({ department }) {
  const [complaints] = useState([
    {
      id: 'CMP-20250425-010',
      student: 'Juan Dela Cruz',
      category: 'Student Behavior',
      subCategory: 'Bullying/Harassment',
      status: 'pending',
      date: '2025-04-25',
      description: 'Verbal harassment incident during class'
    },
    {
      id: 'CMP-20250424-008',
      student: 'Maria Clara',
      category: 'Property',
      subCategory: 'Vandalism',
      status: 'reviewed',
      date: '2025-04-24',
      description: 'Property damage in laboratory'
    }
  ])

  return (
    <div className="admin-complaints">
      <div className="admin-section-header">
        <h3>📢 Department Complaints</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>{department}</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Student</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.student}</td>
                <td>
                  <div className="category-cell">
                    <strong>{complaint.category}</strong>
                    <span>{complaint.subCategory}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${complaint.status}`}>
                    {complaint.status.toUpperCase()}
                  </span>
                </td>
                <td>{complaint.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view-btn">👁️ Review</button>
                    <button className="action-btn">✏️ Update</button>
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

export default DeanComplaints