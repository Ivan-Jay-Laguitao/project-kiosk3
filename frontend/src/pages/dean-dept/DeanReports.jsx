function DeanReports({ department }) {
  return (
    <div className="admin-analytics">
      <div className="admin-section-header">
        <h3>📈 Department Reports</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>{department}</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📢</div>
          <div className="admin-stat-value" style={{ color: '#ed6c02' }}>12</div>
          <div className="admin-stat-label">Active Complaints</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <div className="admin-stat-value" style={{ color: '#2e7d32' }}>89%</div>
          <div className="admin-stat-label">Resolution Rate</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏱️</div>
          <div className="admin-stat-value" style={{ color: '#1565c0' }}>1.8 days</div>
          <div className="admin-stat-label">Avg Resolution Time</div>
        </div>
      </div>

      <div className="admin-section" style={{ marginTop: '30px' }}>
        <h3>📊 Monthly Report Summary</h3>
        <div className="admin-activity-list">
          {[
            { month: 'April 2025', complaints: 15, resolved: 13, pending: 2 },
            { month: 'March 2025', complaints: 18, resolved: 16, pending: 2 },
            { month: 'February 2025', complaints: 12, resolved: 12, pending: 0 },
            { month: 'January 2025', complaints: 20, resolved: 18, pending: 2 }
          ].map((month, index) => (
            <div key={index} className="admin-activity-item">
              <div className="activity-details">
                <div className="activity-action">{month.month}</div>
                <div className="activity-meta">
                  📢 {month.complaints} complaints | ✅ {month.resolved} resolved | ⏳ {month.pending} pending
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button className="admin-action-btn">📥 Download Full Report</button>
        <button className="admin-action-btn" style={{ marginLeft: '10px' }}>📊 Print Summary</button>
      </div>
    </div>
  )
}

export default DeanReports