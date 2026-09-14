import React, { useState } from 'react';
import api from '../../api';
import '../../css/applicationstudent.css';
function Application() {

  const [application, setApplication] = useState({
    program_id: '',
    academic_year: '',
  });

  const [status, setStatus] = useState('Draft');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage('');

    try {

      // STEP 1: Create application
      const response = await api.post('/application',application);

      console.log(
        "Create response:",
        response.data
      );

      // Get application ID
      const applicationId = response.data.application_id;


      // STEP 2: Submit application
      await api.put(`/${applicationId}/submit`);


      // Update frontend
      setStatus('PENDING');

      setMessage(
        'Application submitted successfully!'
      );

    } catch (error) {

      console.error(
        'Error submitting application:',
        error
      );

      setMessage(
        error.response?.data?.message ||
        'Failed to submit application.'
      );
    }
  };


  return (
    <div className="all-continer">

      <h3>STUDENT APPLICATION</h3>

      {message && (
        <p className="message">{message}</p>
      )}

      <form onSubmit={handleSubmit} className='form'>


<strong className='strong'> student select your department *</strong><br/><br/>
           

              
                <select className="select"
                  name="program_id"
                  value={application.program_id}
                  onChange={handleChange}
                  required
                >
                  <div className='option'>
                  <option value="">
                    Select department
                  </option>

                  <option value="1">
                    Information Technology
                  </option>

                  <option value="2">
                   Management
                  </option>

                  <option value="3">
                    Accounting
                  </option>
                   <option value="4">
                  Nursing
                  </option>
                    <option value="4">
                Pharmacy
                  </option>
                   <option value="4">
               Database Administration
                  </option>
                   <option value="4">
              Animal Health
                  </option>
                  
                  
                  </div>
                </select>
         
              <h3>Academic Year</h3>
                <select
                  className="select"
                  name="academic_year"
                  value={application.academic_year}
                  onChange={handleChange}
                  required
                >
                  <div className='option'>
                  <option value="">
                    Select Academic Year
                  </option>

                  <option value="2026/2027">
                    2026/2027
                  </option>

                  <option value="2027/2028">
                    2027/2028
                  </option>
                  </div>
                </select>
            
              <h3>Application Status</h3>

              
                <span
                  className={`status-value ${status.toLowerCase()}`}
                >
                  {status}
                </span>
              
                <button
                  type="submit"
                  className="button">
                  SUBMIT APPLICATION
                </button>
              
          
      </form>

    </div>
  );
}

export default Application;