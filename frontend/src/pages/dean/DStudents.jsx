import React,{useState,useEffect} from 'react'
import api from '../../api';

function DStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/dean/students')
      .then((response) => {
        setStudents(response.data.students || []);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setMessage('Failed to load students.');
      });
  }, []);

  const filteredStudents = students.filter((student) => {

    const studentName = `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.toLowerCase();

    const program =(student.program_name || '').toLowerCase();

    const status = (student.student_status || '').toLowerCase();

    const searchText = search.toLowerCase();

    return (
      studentName.includes(searchText) ||
      program.includes(searchText) ||
      status.includes(searchText)
    );
  });

  return (
    <div className='all-continer'>

      <h3 className='h3'>DEAN - STUDENT MANAGEMENT</h3>
      Totall Students  :{students.length}
      {message && <p>{message}</p>}

      <div className='search'>
        <input className='input'
          type="text"
          placeholder="Search by name, program or status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="button" className='button'>
          Search
        </button>
      </div>

      <br />

      <table className='table' border={1}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="3">No students found.</td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student.student_id}>

                <td>
                  {student.first_name} {student.middle_name || ''} {student.last_name}
                </td>

                <td>
                  {student.program_name || 'Not assigned'}
                </td>

                <td>
                  {student.student_status}
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  )
}

export default DStudents