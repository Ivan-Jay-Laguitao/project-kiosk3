import { useState } from 'react'

function AdminComplaints() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-20250425-001',
      category: 'Student Behavior',
      subCategory: 'Bullying/Harassment',
      status: 'pending',
      submittedBy: 'Juan Dela Cruz',
      building: 'CCS',
      date: '2025-04-25',
      priority: 'high'
    },
    {
      id: 'CMP-20250424-005',
      category: 'Property',
      subCategory: 'Vandalism',
      status: 'reviewed',
      submittedBy: 'Maria Clara',
      building: 'CSM',
      date: '2025-04-24',
      priority: 'medium'
    },
    {
      id: 'CMP-20250423-003',
      category: 'Staff/Faculty',
      subCategory: 'Misconduct',
      status: 'resolved',
      submittedBy: 'Jose Rizal',
      building: 'COE',
      date: '2025-04-23',
      priority: 'high'
    }
  ])

  const handleStatusChange = (complaintId, newStatus) => {
    // ===== PHP BACKEND FETCH: Update complaint status =====
    // try {
    //   await fetch('backend/update_complaint_status.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ complaintId, status: newStatus })
    //   })
    // } catch (error) {
    //   console.error('Update error:', error)
    // }
    // ===== END BACKEND FETCH =====

    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, status: newStatus } : c
    ))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ed6c02'
      case 'reviewed': return '#1565c0'
      case 'resolved': return '#2e7d32'
      default: return '#666'
    }
  }

  const filteredComplaints = complaints.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false
    if (searchTerm && !c.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !c.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="admin-complaints">
      <div className="admin-section-header">
        <h3>📢 Complaint Management</h3>
        <div className="admin-header-actions">
          <input 
            type="text"
            placeholder="🔍 Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Category</th>
              <th>Submitted By</th>
              <th>Building</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map(complaint => (
              <tr key={complaint.id}>
                <td className="ref-cell">{complaint.id}</td>
                <td>
                  <div className="category-cell">
                    <strong>{complaint.category}</strong>
                    <span>{complaint.subCategory}</span>
                  </div>
                </td>
                <td>{complaint.submittedBy}</td>
                <td>{complaint.building}</td>
                <td>{complaint.date}</td>
                <td>
                  <span className={`priority-badge ${complaint.priority}`}>
                    {complaint.priority.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(complaint.status) }}
                  >
                    {complaint.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {complaint.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(complaint.id, 'reviewed')}
                        className="action-btn review-btn"
                      >
                        Review
                      </button>
                    )}
                    {complaint.status === 'reviewed' && (
                      <button 
                        onClick={() => handleStatusChange(complaint.id, 'resolved')}
                        className="action-btn resolve-btn"
                      >
                        Resolve
                      </button>
                    )}
                    <button className="action-btn view-btn">👁️</button>
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

export default AdminComplaints