import { useState } from 'react'
import DeanComplaints from './DeanComplaints'
import DeanStudents from './DeanStudents'
import DeanReports from './DeanReports'
import '../../styles/admin.css'

function DeanDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'complaints', icon: '📢', label: 'Complaints' },
    { id: 'students', icon: '🎓', label: 'Students' },
    { id: 'reports', icon: '📈', label: 'Reports' }
  ]

  const departmentStats = {
    totalStudents: 1250,
    totalFaculty: 85,
    pendingComplaints: 12,
    facilityIssues: 8,
    resolvedThisMonth: 45
  }

  return (
    <div className="admin-dashboard dean-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar dean-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-avatar">📚</div>
          <h3>{user.name}</h3>
          <p>{user.position}</p>
          <span style={{ fontSize: '12px', color: '#81c784' }}>{user.department}</span>
        </div>

        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={onLogout} className="admin-logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-topbar dean-topbar">
          <h2>{user.department}</h2>
          <div className="admin-topbar-actions">
            <span className="admin-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="admin-overview">
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">🎓</div>
                  <div className="admin-stat-value" style={{ color: '#1565c0' }}>
                    {departmentStats.totalStudents}
                  </div>
                  <div className="admin-stat-label">Total Students</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">👨‍🏫</div>
                  <div className="admin-stat-value" style={{ color: '#2e7d32' }}>
                    {departmentStats.totalFaculty}
                  </div>
                  <div className="admin-stat-label">Faculty Members</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">📢</div>
                  <div className="admin-stat-value" style={{ color: '#ed6c02' }}>
                    {departmentStats.pendingComplaints}
                  </div>
                  <div className="admin-stat-label">Pending Complaints</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">✅</div>
                  <div className="admin-stat-value" style={{ color: '#2e7d32' }}>
                    {departmentStats.resolvedThisMonth}
                  </div>
                  <div className="admin-stat-label">Resolved This Month</div>
                </div>
              </div>

              <div className="admin-section">
                <h3>📋 Recent Department Activity</h3>
                <div className="admin-activity-list">
                  {[
                    { action: 'Student complaint filed', details: 'CCS - Room 205', time: '30 mins ago' },
                    { action: 'Facility issue reported', details: 'CSM Lab - AC not working', time: '1 hour ago' },
                    { action: 'Faculty meeting scheduled', details: 'Department conference', time: '2 hours ago' },
                    { action: 'Complaint resolved', details: 'Student Behavior case', time: '3 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="admin-activity-item">
                      <div className="activity-details">
                        <div className="activity-action">{activity.action}</div>
                        <div className="activity-meta">{activity.details} • {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && <DeanComplaints department={user.department} />}
          {activeTab === 'students' && <DeanStudents department={user.department} />}
          {activeTab === 'reports' && <DeanReports department={user.department} />}
        </div>
      </div>
    </div>
  )
}

export default DeanDashboard