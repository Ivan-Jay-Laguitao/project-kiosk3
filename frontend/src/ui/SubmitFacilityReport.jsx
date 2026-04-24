import { useState } from 'react'

function SubmitFacilityReport() {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    building: '',
    location: '',
    description: '',
    priority: 'routine'
  })
  const [confirmed, setConfirmed] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = {
    'Electrical': ['Flickering lights', 'Exposed wire', 'Outlets not working', 'Outlet sparking(EMERGENCY)', 'No power in room', 'Burning smell(EMERGENCY)', 'Others'],
    'Plumbing': ['Clogged toilet', 'Leaking pipe', 'Drain smell', 'No water supply', 'Others'],
    'HVAC': ['No air-conditioning', 'Water leak from AC', 'AC making noise', 'Others'],
    'IT Equipment': ['Projector not working', 'PC not booting', 'Wi-Fi not connecting', 'Printer issue', 'iBoard not responding', 'Others'],
    'Structural': ['Roof leak', 'Wall crack', 'Ceiling damage', 'Door/Windows issue', 'Others'],
    'Grounds/Landscape': ['Overgrown grass', 'Fallen branches', 'Damaged sidewalk', 'Pothole', 'Outdoor trash', 'Others'],
    'Others': ['Please specify']
  }

  const buildings = ['CCS', 'CSM', 'COE', 'CED', 'CASS', 'CEBA', 'CHS', 'Library', 'Administration', 'Student Services', 'Gymnasium']

  const priorityConfig = {
    emergency: { label: '🚨 Emergency', desc: 'Threatens life or safety', color: '#d32f2f' },
    urgent: { label: '⚡ Urgent', desc: 'Disrupts classes or operations', color: '#ed6c02' },
    routine: { label: '📋 Routine', desc: 'Causes inconvenience', color: '#2e7d32' }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Auto-set priority based on sub-category
  const getAutoPriority = (subCategory) => {
    const emergencies = ['outlet sparking', 'burning smell', 'exposed wire']
    const urgents = ['no power in room', 'no air-conditioning', 'projector not working', 'no water supply']
    
    if (emergencies.some(e => subCategory?.toLowerCase().includes(e))) return 'emergency'
    if (urgents.some(u => subCategory?.toLowerCase().includes(u))) return 'urgent'
    return 'routine'
  }

  const handleSubCategoryChange = (e) => {
    const sub = e.target.value
    setFormData({ 
      ...formData, 
      subCategory: sub,
      priority: getAutoPriority(sub)
    })
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (!confirmed) {
      alert('Please confirm that your report is truthful')
      return
    }
    setShowReview(true)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    const refNo = `FAC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`
    
    // ===== PHP BACKEND FETCH: Submit facility report to database =====
    // const submitData = {
    //   ...formData,
    //   referenceNumber: refNo,
    //   type: 'facility',
    //   submittedDate: new Date().toISOString()
    // }
    //
    // try {
    //   const response = await fetch('backend/submit_facility.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(submitData)
    //   })
    //   const result = await response.json()
    //   if (!result.success) {
    //     alert('Submission failed. Please try again.')
    //     setIsSubmitting(false)
    //     return
    //   }
    // } catch (error) {
    //   console.error('Submission error:', error)
    //   alert('Network error. Please try again.')
    //   setIsSubmitting(false)
    //   return
    // }
    // ===== END PHP BACKEND FETCH =====
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setReferenceNumber(refNo)
    setIsSubmitted(true)
    setShowReview(false)
    setIsSubmitting(false)
  }

  const handleNewReport = () => {
    setFormData({
      category: '',
      subCategory: '',
      building: '',
      location: '',
      description: '',
      priority: 'routine'
    })
    setConfirmed(false)
    setIsSubmitted(false)
    setReferenceNumber('')
  }

  // ===== SUCCESS VIEW =====
  if (isSubmitted) {
    return (
      <div className="form-card">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="success-icon" style={{ fontSize: '64px' }}>✅</div>
          <h2 style={{ color: '#4a0e0e', marginBottom: '10px' }}>Facility Report Submitted!</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Your maintenance report has been successfully recorded.
          </p>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #d4a017 0%, #b8860b 100%)',
            padding: '20px',
            borderRadius: '12px',
            display: 'inline-block',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)'
          }}>
            <div style={{ fontSize: '12px', color: '#4a0e0e', fontWeight: 'bold', marginBottom: '5px', letterSpacing: '1px' }}>
              REFERENCE NUMBER
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a0e0e', letterSpacing: '1px' }}>
              {referenceNumber}
            </div>
          </div>

          {formData.priority === 'emergency' && (
            <div className="emergency-box" style={{ margin: '20px auto', maxWidth: '400px' }}>
              <h4>🚨 EMERGENCY ALERT</h4>
              <p>📞 Campus Security: (063) XXX-XXXX</p>
              <p>🔥 Fire Department: 160 / 221-9055</p>
            </div>
          )}
          
          <div style={{
            background: '#fff8e1',
            padding: '15px 20px',
            borderRadius: '10px',
            margin: '20px auto',
            maxWidth: '400px',
            border: '1px dashed #d4a017',
            fontSize: '14px',
            color: '#555',
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>📋 Important:</p>
            <p>• Save your Reference Number to track maintenance status</p>
            <p>• Emergency issues will be addressed immediately</p>
            <p>• Routine maintenance: 5-7 working days</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '25px' }}>
            <button onClick={handleNewReport} className="btn-secondary">
              📝 Submit New Report
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="submit-btn" 
              style={{ maxWidth: '200px' }}
            >
              🔍 Track Report
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      <h3 className="form-title">🔧 Facility Maintenance Report</h3>
      
      <form onSubmit={handleReview}>
        <div className="section-title">📂 Issue Category</div>
        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {Object.keys(categories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Specific Issue *</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleSubCategoryChange} required disabled={!formData.category}>
              <option value="">Select Issue</option>
              {formData.category && categories[formData.category]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="section-title">📍 Location</div>
        <div className="form-row">
          <div className="form-group">
            <label>Building *</label>
            <select name="building" value={formData.building} onChange={handleChange} required>
              <option value="">Select Building</option>
              {buildings.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Location (Room/Area) *</label>
            <input type="text" name="location" placeholder="e.g., Room 205, 3rd Floor / East wing hallway" value={formData.location} onChange={handleChange} required />
          </div>
        </div>

        <div className="section-title">📝 Issue Details</div>
        <div className="form-group">
          <label>Description *</label>
          <textarea rows="4" name="description" placeholder="Please describe the issue in detail... Include specific observations and how it affects your activities." value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label>Priority Level *</label>
          <div className="priority-options">
            {Object.entries(priorityConfig).map(([key, config]) => (
              <label key={key} className={`priority-label ${key} ${formData.priority === key ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="priority" 
                  value={key}
                  checked={formData.priority === key}
                  onChange={handleChange}
                />
                <span style={{ fontWeight: 'bold' }}>{config.label}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>- {config.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {formData.priority === 'emergency' && (
          <div className="emergency-box" style={{ marginBottom: '20px' }}>
            <h4>🚨 EMERGENCY ALERT</h4>
            <p>This issue requires immediate attention!</p>
            <p>📞 Campus Security: (063) XXX-XXXX</p>
            <p>🔥 Fire Department: 160 / 221-9055</p>
          </div>
        )}

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="confirmFacility" 
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <label htmlFor="confirmFacility">
            I confirm that this report is truthful and accurate. I understand that false reports 
            may result in disciplinary action.
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={!confirmed}>
          👁️ Review & Submit Report
        </button>
      </form>

      {/* ===== REVIEW MODAL ===== */}
      {showReview && (
        <div className="review-overlay" onClick={() => setShowReview(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <h3>📋 Review Your Facility Report</h3>
            
            <div className="section-title">📂 Issue</div>
            <div className="review-grid">
              <div className="review-label">Category:</div>
              <div className="review-value">{formData.category}</div>
              <div className="review-label">Issue:</div>
              <div className="review-value">{formData.subCategory}</div>
            </div>

            <div className="section-title">📍 Location</div>
            <div className="review-grid">
              <div className="review-label">Building:</div>
              <div className="review-value">{formData.building}</div>
              <div className="review-label">Location:</div>
              <div className="review-value">{formData.location}</div>
            </div>

            <div className="section-title">📝 Details</div>
            <div className="review-grid">
              <div className="review-label">Priority:</div>
              <div className="review-value">
                <span className={`review-priority ${formData.priority}`}>
                  {priorityConfig[formData.priority].label}
                </span>
              </div>
              <div className="review-label">Description:</div>
              <div className="review-value" style={{ whiteSpace: 'pre-wrap' }}>{formData.description}</div>
            </div>

            <div className="button-group">
              <button onClick={() => setShowReview(false)} className="btn-secondary">
                ✏️ Edit Report
              </button>
              <button 
                onClick={handleSubmit} 
                className="submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Submitting...' : '✅ Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitFacilityReport