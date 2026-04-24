import { useState } from 'react'
import SubmitComplaint from './SubmitComplaint'
import TrackReport from './TrackReport'
import SubmitFacilityReport from './SubmitFacilityReport'

function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('submit-complaint')

  const tabs = [
    { id: 'submit-complaint', icon: '📢', label: 'Submit Complaint' },
    { id: 'submit-facility', icon: '🔧', label: 'Facility Report' },
    { id: 'track', icon: '🔍', label: 'Track Report' }
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-title">
          <h2>Welcome, {user.name}! 👋</h2>
          <p>{user.role === 'student' ? '🎓 Student' : user.role === 'staff' ? '👔 Staff' : '📚 Faculty'} | {user.department}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
          🚪 Logout
        </button>
      </div>

      <div className="dashboard-nav">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'submit-complaint' && <SubmitComplaint />}
        {activeTab === 'submit-facility' && <SubmitFacilityReport />}
        {activeTab === 'track' && <TrackReport />}
      </div>
    </div>
  )
}

export default StudentDashboard