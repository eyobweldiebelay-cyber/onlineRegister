import React,{useState} from 'react'

import api from '../../api';
import '../../css/Profile.css'
function Profile() {

  const [first_name, setFirs_Name] = useState();
  const [middle_name, setMiddleName] = useState();
  const [last_name, setLastName] = useState();
 const [date_of_birth, setDateOfBirth] = useState();
 const [sex, setSex] = useState();
 const [nationalId, setNationalId] = useState();
 const [phone, setPhone] = useState();
 const [address, setAddress] = useState();

  const [message, setMessage] = useState('');
     
  
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const profileData = await api.post('/student', {
            first_name,
            middle_name,
            last_name,
            phone,
            sex,
            date_of_birth,
            nationalId,
            address
        });

        console.log("FULL RESPONSE:", profileData);
        console.log("RESPONSE DATA:", profileData.data);

        setMessage("Profile saved successfully!");

    } catch (error) {
        console.error("Error saving profile:", error);
        console.error("SERVER ERROR:", error.response?.data);

        setMessage("Failed to save profile.");
    }
};

  return (
    <div className='top-div'>
      <h1>MY PROFILE</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className='form'>
        {/* First Name */}
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirs_Name(e.target.value)}
          />
        </div>

        {/* Middle Name */}
        <div>
          <label>Middle Name</label>
          <input
            type="text"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={date_of_birth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        {/* Sex */}
        <div>
          <label>Sex</label>
         <select
  className='select'

  value={sex}
  onChange={(e) => setSex(e.target.value)}
>
  <option value="">Select Sex</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
        </div>

        {/* National ID */}
        <div>
          <label>National ID</label>
           <input type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone</label>
          <input type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <input type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div>
          <button type="submit" className='button'>
            SAVE
          </button>
        </div>
      </form>
    </div>
  




    
  );
}

export default Profile