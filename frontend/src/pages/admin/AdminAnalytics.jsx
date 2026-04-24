function AdminAnalytics() {
  const analyticsData = {
    totalReports: 245,
    resolvedThisMonth: 67,
    averageResponseTime: '2.3 hours',
    satisfactionRate: '94%'
  }

  return (
    <div className="admin-analytics">
      <div className="admin-section-header">
        <h3>📈 Analytics & Reports</h3>
        <div className="admin-header-actions">
          <select className="admin-filter-select">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="admin-action-btn">📊 Download Report</button>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>
          <div className="admin-stat-value" style={{ color: '#1565c0' }}>{analyticsData.totalReports}</div>
          <div className="admin-stat-label">Total Reports</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">✅</div>
          <div className="admin-stat-value" style={{ color: '#2e7d32' }}>{analyticsData.resolvedThisMonth}</div>
          <div className="admin-stat-label">Resolved This Month</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">⏱️</div>
          <div className="admin-stat-value" style={{ color: '#ed6c02' }}>{analyticsData.averageResponseTime}</div>
          <div className="admin-stat-label">Avg Response Time</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">⭐</div>
          <div className="admin-stat-value" style={{ color: '#d4a017' }}>{analyticsData.satisfactionRate}</div>
          <div className="admin-stat-label">Satisfaction Rate</div>
        </div>
      </div>

      <div className="admin-chart-placeholder">
        <h4>📊 Reports by Category</h4>
        <div className="chart-bars">
          {[
            { category: 'Electrical', count: 45, color: '#d32f2f' },
            { category: 'Plumbing', count: 32, color: '#1565c0' },
            { category: 'HVAC', count: 28, color: '#2e7d32' },
            { category: 'IT Equipment', count: 38, color: '#d4a017' },
            { category: 'Structural', count: 15, color: '#6a1b9a' }
          ].map((item, index) => (
            <div key={index} className="chart-bar-item">
              <div className="chart-bar-label">{item.category}</div>
              <div className="chart-bar-track">
                <div 
                  className="chart-bar-fill" 
                  style={{ 
                    width: `${(item.count / 50) * 100}%`,
                    backgroundColor: item.color 
                  }}
                ></div>
                <span className="chart-bar-value">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics