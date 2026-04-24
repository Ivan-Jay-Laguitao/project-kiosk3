import { useState } from 'react'

function SubmitComplaint() {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    building: '',
    floor: '',
    room: '',
    date: '',
    time: '',
    accusedName: '',
    description: '',
    witnesses: ''
  })
  const [confirmed, setConfirmed] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = {
    'Student Behavior': ['Bullying/Harassment', 'Cheating', 'Substance Use', 'Disruption of Learning Environment'],
    'Property': ['Vandalism', 'Theft'],
    'Staff/Faculty': ['Misconduct', 'Neglect of Duties']
  }

  const buildings = ['CCS', 'CSM', 'COE', 'CED', 'CASS', 'CEBA', 'CHS', 'Library', 'Administration', 'Student Services', 'Gymnasium']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    
    // Generate reference number
    const refNo = `CMP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`
    
    // ===== PHP BACKEND FETCH: Submit complaint to database =====
    // const submitData = {
    //   ...formData,
    //   referenceNumber: refNo,
    //   type: 'complaint',
    //   submittedDate: new Date().toISOString()
    // }
    // 
    // try {
    //   const response = await fetch('backend/submit_complaint.php', {
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
    
    // Simulate API call
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
      floor: '',
      room: '',
      date: '',
      time: '',
      accusedName: '',
      description: '',
      witnesses: ''
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
          <h2 style={{ color: '#4a0e0e', marginBottom: '10px' }}>Complaint Submitted!</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Your complaint has been successfully recorded in the system.
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
            <p>• Save your Reference Number to track your complaint</p>
            <p>• You will receive updates via your registered email</p>
            <p>• Average review time: 3-5 working days</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '25px' }}>
            <button onClick={handleNewReport} className="btn-secondary">
              📝 Submit New Report
            </button>
            <button 
              onClick={() => {
                /* Navigate to track - you can pass this up or use a callback */
                window.location.reload()
              }} 
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
      <h3 className="form-title">📢 Submit a Complaint</h3>
      
      <form onSubmit={handleReview}>
        {/* Section 1: Category */}
        <div className="section-title">📂 Report Category</div>
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
            <label>Sub-Category *</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange} required disabled={!formData.category}>
              <option value="">Select Sub-Category</option>
              {formData.category && categories[formData.category]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Location */}
        <div className="section-title">📍 Location Details</div>
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
            <label>Floor</label>
            <input type="text" name="floor" placeholder="e.g., 3rd Floor" value={formData.floor} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Room</label>
            <input type="text" name="room" placeholder="e.g., Room 205" value={formData.room} onChange={handleChange} />
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label>Date of Incident *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {/* Section 3: Incident Details */}
        <div className="section-title">📝 Incident Details</div>
        <div className="form-group">
          <label>Name of Accused (if known)</label>
          <input type="text" name="accusedName" placeholder="Enter full name of the accused" value={formData.accusedName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Description of Incident *</label>
          <textarea 
            rows="5" 
            name="description" 
            placeholder="Please describe what happened in detail... Include relevant information such as:&#10;• What happened?&#10;• Who was involved?&#10;• When and where did it occur?&#10;• Any prior incidents related to this?"
            value={formData.description} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Witnesses (if any)</label>
          <input type="text" name="witnesses" placeholder="Names of witnesses, separated by commas" value={formData.witnesses} onChange={handleChange} />
        </div>

        {/* Confirmation */}
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="confirmComplaint" 
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <label htmlFor="confirmComplaint">
            I confirm that this report is truthful and accurate to the best of my knowledge. 
            I understand that false reports may be subject to disciplinary action under the 
            MSU-IIT Student Code of Conduct.
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={!confirmed}>
          👁️ Review & Submit Complaint
        </button>
      </form>

      {/* ===== REVIEW MODAL ===== */}
      {showReview && (
        <div className="review-overlay" onClick={() => setShowReview(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <h3>📋 Review Your Complaint</h3>
            
            <div className="section-title">📂 Category</div>
            <div className="review-grid">
              <div className="review-label">Category:</div>
              <div className="review-value">{formData.category}</div>
              <div className="review-label">Sub-Category:</div>
              <div className="review-value">{formData.subCategory}</div>
            </div>

            <div className="section-title">📍 Location</div>
            <div className="review-grid">
              <div className="review-label">Building:</div>
              <div className="review-value">{formData.building}</div>
              <div className="review-label">Floor:</div>
              <div className="review-value">{formData.floor || 'Not specified'}</div>
              <div className="review-label">Room:</div>
              <div className="review-value">{formData.room || 'Not specified'}</div>
              <div className="review-label">Date:</div>
              <div className="review-value">{formData.date}</div>
              <div className="review-label">Time:</div>
              <div className="review-value">{formData.time}</div>
            </div>

            <div className="section-title">📝 Details</div>
            <div className="review-grid">
              <div className="review-label">Accused:</div>
              <div className="review-value">{formData.accusedName || 'Not specified'}</div>
              <div className="review-label">Description:</div>
              <div className="review-value" style={{ whiteSpace: 'pre-wrap' }}>{formData.description}</div>
              <div className="review-label">Witnesses:</div>
              <div className="review-value">{formData.witnesses || 'None'}</div>
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
                {isSubmitting ? '⏳ Submitting...' : '✅ Submit Complaint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitComplaint