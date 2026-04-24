import { useState } from 'react'

function AdminFacilityReports() {
  const [filter, setFilter] = useState('all')

  const [reports, setReports] = useState([
    {
      id: 'FAC-20250425-001',
      category: 'Electrical',
      subCategory: 'Flickering lights',
      status: 'pending',
      building: 'CCS',
      location: 'Room 205',
      priority: 'routine',
      reportedBy: 'Prof. Santos',
      date: '2025-04-25'
    },
    {
      id: 'FAC-20250425-002',
      category: 'Plumbing',
      subCategory: 'Leaking pipe',
      status: 'in-progress',
      building: 'CSM',
      location: '2nd Floor CR',
      priority: 'urgent',
      reportedBy: 'Juan Dela Cruz',
      date: '2025-04-25'
    },
    {
      id: 'FAC-20250424-003',
      category: 'Electrical',
      subCategory: 'Outlet sparking',
      status: 'emergency',
      building: 'COE',
      location: 'Lab Room 3',
      priority: 'emergency',
      reportedBy: 'Lab Assistant',
      date: '2025-04-24'
    }
  ])

  const handleStatusChange = (reportId, newStatus) => {
    // ===== PHP BACKEND FETCH: Update facility report status in database =====
    // try {
    //   const response = await fetch('backend/update_facility_status.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ reportId, status: newStatus })
    //   })
    // } catch (error) {
    //   console.error('Update error:', error)
    // }
    // ===== END BACKEND FETCH =====

    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: newStatus } : r
    ))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'emergency': return '#d32f2f'
      case 'urgent': return '#ed6c02'
      case 'routine': return '#2e7d32'
      default: return '#666'
    }
  }

  return (
    <div className="admin-facility">
      <div className="admin-section-header">
        <h3>🔧 Facility Reports Management</h3>
        <div className="admin-header-actions">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="emergency">Emergency</option>
          </select>
          <button className="admin-action-btn">📊 Export</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports
              .filter(r => filter === 'all' || r.status === filter || 
                     (filter === 'emergency' && r.priority === 'emergency'))
              .map(report => (
                <tr key={report.id} className={report.priority === 'emergency' ? 'emergency-row' : ''}>
                  <td className="ref-cell">{report.id}</td>
                  <td>
                    <div className="category-cell">
                      <strong>{report.category}</strong>
                      <span>{report.subCategory}</span>
                    </div>
                  </td>
                  <td>
                    <div className="location-cell">
                      <strong>{report.building}</strong>
                      <span>{report.location}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(report.priority) }}
                    >
                      {report.priority.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td>{report.reportedBy}</td>
                  <td>{report.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn">👁️</button>
                      <button className="action-btn assign-btn">👤 Assign</button>
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

export default AdminFacilityReports