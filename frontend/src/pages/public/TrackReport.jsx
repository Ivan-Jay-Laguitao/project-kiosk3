import { useState } from 'react'

function TrackReport() {
  const [referenceNumber, setReferenceNumber] = useState('')
  const [searched, setSearched] = useState(false)
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async () => {
    if (!referenceNumber) return
    
    setIsLoading(true)
    
    // ===== PHP BACKEND FETCH: Track report by reference number =====
    // try {
    //   const response = await fetch(`backend/track_report.php?ref=${encodeURIComponent(referenceNumber)}`)
    //   const data = await response.json()
    //   
    //   if (data.success && data.report) {
    //     setReport(data.report)
    //   } else {
    //     setReport(null)
    //   }
    // } catch (error) {
    //   console.error('Tracking error:', error)
    //   setReport(null)
    // }
    // ===== END PHP BACKEND FETCH =====
    
    // Mock data for demonstration (remove when PHP backend is connected)
    setTimeout(() => {
      const mockReports = {
        'CMP-20250409-001': {
          type: 'complaint',
          category: 'Student Behavior',
          subCategory: 'Bullying/Harassment',
          status: 'reviewed',
          statusLabel: 'Reviewed',
          submittedDate: 'April 9, 2025',
          description: 'Verbal harassment during class break',
          timeline: [
            { date: 'April 9, 2025 - 10:30 AM', label: 'Report Submitted' },
            { date: 'April 10, 2025 - 2:00 PM', label: 'Under Review by OVCSS' },
          ]
        },
        'FAC-20250409-001': {
          type: 'facility',
          category: 'Electrical',
          subCategory: 'Flickering lights',
          status: 'scheduled',
          statusLabel: 'Scheduled to Fix',
          submittedDate: 'April 8, 2025',
          scheduledDate: 'April 12, 2025',
          description: 'Lights flickering in Room 205',
          timeline: [
            { date: 'April 8, 2025 - 9:15 AM', label: 'Report Submitted' },
            { date: 'April 9, 2025 - 11:00 AM', label: 'Inspected by Maintenance' },
            { date: 'April 10, 2025', label: 'Scheduled for Repair' },
          ]
        },
        'FAC-20250407-002': {
          type: 'facility',
          category: 'Plumbing',
          subCategory: 'Clogged toilet',
          status: 'resolved',
          statusLabel: 'Resolved',
          submittedDate: 'April 7, 2025',
          resolvedDate: 'April 9, 2025',
          description: 'Toilet in CR 3rd floor',
          timeline: [
            { date: 'April 7, 2025 - 8:00 AM', label: 'Report Submitted' },
            { date: 'April 8, 2025 - 10:00 AM', label: 'In Progress' },
            { date: 'April 9, 2025 - 3:00 PM', label: 'Resolved', completed: true },
          ]
        }
      }
      
      setReport(mockReports[referenceNumber] || null)
      setSearched(true)
      setIsLoading(false)
    }, 800)
  }

  const getStatusClass = (status) => {
    switch(status) {
      case 'reviewed': return 'status-reviewed'
      case 'scheduled': return 'status-scheduled'
      case 'resolved': return 'status-resolved'
      default: return ''
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'reviewed': return '🟡 REVIEWED'
      case 'scheduled': return '🟠 SCHEDULED TO FIX'
      case 'resolved': return '🟢 RESOLVED'
      default: return ''
    }
  }

  return (
    <div className="track-container">
      <h3 className="form-title" style={{ textAlign: 'center', borderLeft: 'none', borderBottom: '3px solid #d4a017', display: 'inline-block', paddingBottom: '12px', marginBottom: '30px' }}>
        🔍 Track Your Report
      </h3>

      <div className="track-input">
        <p>Enter your Reference Number to check the status of your report</p>
        <input 
          type="text" 
          placeholder="e.g., CMP-20250409-001"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
        />
        <button onClick={handleTrack} className="track-btn" disabled={isLoading}>
          {isLoading ? '⏳ Searching...' : '🔍 Track Report'}
        </button>
      </div>

      {searched && report && (
        <div className="report-status">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h4 style={{ color: '#4a0e0e' }}>
              {report.type === 'complaint' ? '📢 Complaint' : '🔧 Facility'} Report
            </h4>
            <span className={`status-badge ${getStatusClass(report.status)}`}>
              {getStatusBadge(report.status)}
            </span>
          </div>

          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '15px' }}>
            <p><strong>Reference Number:</strong> <span style={{ fontFamily: 'monospace' }}>{referenceNumber}</span></p>
            <p><strong>Category:</strong> {report.category} → {report.subCategory}</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Submitted:</strong> {report.submittedDate}</p>
            
            {report.status === 'scheduled' && (
              <p><strong>📅 Scheduled Fix Date:</strong> {report.scheduledDate}</p>
            )}
            
            {report.status === 'resolved' && (
              <p><strong>✅ Resolved On:</strong> {report.resolvedDate}</p>
            )}
          </div>

          {/* Timeline */}
          {report.timeline && (
            <div style={{ marginTop: '25px' }}>
              <h4 style={{ color: '#4a0e0e', marginBottom: '15px' }}>📋 Status Timeline</h4>
              <div className="timeline">
                {report.timeline.map((item, index) => (
                  <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="info-banner">
            <span>📱</span>
            <span>Need assistance? Contact OVCSS: (063) 221-2179 local 4158</span>
          </div>
        </div>
      )}

      {searched && !report && referenceNumber && !isLoading && (
        <div className="report-status">
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>❌</span>
            <h4 style={{ color: '#d32f2f', marginTop: '10px' }}>Report Not Found</h4>
            <p style={{ marginBottom: '15px' }}>The Reference Number you entered does not match any existing report.</p>
            <div style={{ 
              background: '#f5f5f5', 
              padding: '12px', 
              borderRadius: '8px',
              fontSize: '13px',
              textAlign: 'left'
            }}>
              <p><strong>Please verify:</strong></p>
              <p>• Format should be: CMP-YYYYMMDD-XXX or FAC-YYYYMMDD-XXX</p>
              <p>• Check for typos or missing characters</p>
              <p>• Reference number is case-sensitive</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrackReport