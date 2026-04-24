import { useState } from 'react'
import AdminComplaints from './AdminComplaints'
import AdminFacilityReports from './AdminFacilityReports'
import AdminUsers from './AdminUsers'
import AdminAnalytics from './AdminAnalytics'
import '../../styles/admin.css'

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'complaints', icon: '📢', label: 'Complaints' },
    { id: 'facility', icon: '🔧', label: 'Facility Reports' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'analytics', icon: '📈', label: 'Analytics' }
  ]

  // Mock statistics
  const stats = [
    { label: 'Total Complaints', value: '156', change: '+12%', color: '#d32f2f' },
    { label: 'Facility Reports', value: '89', change: '+5%', color: '#ed6c02' },
    { label: 'Pending Review', value: '23', change: '-8%', color: '#1565c0' },
    { label: 'Resolved Today', value: '15', change: '+20%', color: '#2e7d32' }
  ]

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-avatar">🛡️</div>
          <h3>{user.name}</h3>
          <p>{user.position}</p>
          <span className="admin-badge">Admin</span>
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
        <div className="admin-topbar">
          <h2>Admin Dashboard</h2>
          <div className="admin-topbar-actions">
            <span className="admin-notification">🔔 5</span>
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
              {/* Stats Cards */}
              <div className="admin-stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="admin-stat-card">
                    <div className="admin-stat-value" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="admin-stat-label">{stat.label}</div>
                    <div className="admin-stat-change" style={{ 
                      color: stat.change.startsWith('+') ? '#2e7d32' : '#d32f2f' 
                    }}>
                      {stat.change} from last month
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="admin-section">
                <h3>📋 Recent Activity</h3>
                <div className="admin-activity-list">
                  {[
                    { action: 'New complaint filed', user: 'Student', time: '10 mins ago', type: 'complaint' },
                    { action: 'Facility report resolved', user: 'Maintenance', time: '25 mins ago', type: 'facility' },
                    { action: 'User account created', user: 'Admin', time: '1 hour ago', type: 'user' },
                    { action: 'Complaint status updated', user: 'Reviewer', time: '2 hours ago', type: 'complaint' },
                    { action: 'Emergency report received', user: 'Faculty', time: '3 hours ago', type: 'emergency' }
                  ].map((activity, index) => (
                    <div key={index} className="admin-activity-item">
                      <div className={`activity-icon ${activity.type}`}>
                        {activity.type === 'complaint' ? '📢' : 
                         activity.type === 'facility' ? '🔧' : 
                         activity.type === 'emergency' ? '🚨' : '👤'}
                      </div>
                      <div className="activity-details">
                        <div className="activity-action">{activity.action}</div>
                        <div className="activity-meta">{activity.user} • {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-section">
                <h3>⚡ Quick Actions</h3>
                <div className="admin-quick-actions">
                  <button onClick={() => setActiveTab('complaints')} className="quick-action-btn">
                    📢 Review Complaints
                  </button>
                  <button onClick={() => setActiveTab('facility')} className="quick-action-btn">
                    🔧 Manage Reports
                  </button>
                  <button onClick={() => setActiveTab('users')} className="quick-action-btn">
                    👥 Manage Users
                  </button>
                  <button className="quick-action-btn">
                    📊 Generate Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && <AdminComplaints />}
          {activeTab === 'facility' && <AdminFacilityReports />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'analytics' && <AdminAnalytics />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard