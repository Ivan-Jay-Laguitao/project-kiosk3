import { useState } from 'react'
//const [complaints, setComplaints] = useState([
function DeanComplaints({ department }) {
  const [complaints, setComplaints] = useState([
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
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const handleStatusChange = (complaintId, newStatus) => {
    // ===== PHP BACKEND FETCH: Update complaint status in database =====
    // try {
    //   const response = await fetch('backend/update_complaint_status.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ complaintId, status: newStatus })
    //   })
    //   const result = await response.json()
    //   if (!result.success) {
    //     console.error('Failed to update complaint status')
    //     return
    //   }
    // } catch (error) {
    //   console.error('Update error:', error)
    // }
    // ===== END BACKEND FETCH =====
    
    setComplaints(prev => prev.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, status: newStatus }
        : complaint
    ))

    if (selectedComplaint?.id === complaintId) {
      setSelectedComplaint(prev => prev ? { ...prev, status: newStatus } : prev)
    }
  }

  const openReview = (complaint) => {
    setSelectedComplaint(complaint)
  }

  const closeReview = () => {
    setSelectedComplaint(null)
  }

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
                    <button
                      className="action-btn view-btn"
                      onClick={() => openReview(complaint)}
                    >
                      👁️ Review
                    </button>
                    {complaint.status === 'pending' && (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusChange(complaint.id, 'reviewed')}
                        >
                          ✅ Reviewed
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusChange(complaint.id, 'rejected')}
                        >
                          ❌ Rejected
                        </button>
                      </>
                    )}
                    {complaint.status === 'reviewed' && (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusChange(complaint.id, 'resolved')}
                        >
                          ✅ Resolve
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusChange(complaint.id, 'rejected')}
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {complaint.status === 'rejected' && (
                      <button
                        className="action-btn"
                        onClick={() => handleStatusChange(complaint.id, 'reviewed')}
                      >
                        🔄 Reopen
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedComplaint && (
        <div className="review-overlay" onClick={closeReview}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <h3>📝 Complaint Details</h3>
            <div className="review-grid">
              <div className="review-label">Reference No.</div>
              <div className="review-value">{selectedComplaint.id}</div>
              <div className="review-label">Student</div>
              <div className="review-value">{selectedComplaint.student}</div>
              <div className="review-label">Category</div>
              <div className="review-value">{selectedComplaint.category}</div>
              <div className="review-label">Sub-category</div>
              <div className="review-value">{selectedComplaint.subCategory}</div>
              <div className="review-label">Status</div>
              <div className="review-value">{selectedComplaint.status}</div>
              <div className="review-label">Date</div>
              <div className="review-value">{selectedComplaint.date}</div>
              <div className="review-label">Description</div>
              <div className="review-value">{selectedComplaint.description}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button className="btn-secondary" onClick={closeReview}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeanComplaints