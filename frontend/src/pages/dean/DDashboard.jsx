import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/Dashboard.css';

const Dashboard = () => {
const navigate = useNavigate();

const [dashboard, setDashboard] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
    fetchDashboard();
}, []);

const fetchDashboard = async () => {
    try {
        setLoading(true);
        setError('');

       

        const response = await api.get('/dean/dashboard');

        setDashboard(response.data.data);
    } catch (error) {
        console.error('Dean dashboard error:', error);

        setError(
            error.response?.data?.message ||
            'Failed to load Dean dashboard'
        );
    } finally {
        setLoading(false);
    }
};

if (loading) {
    return (
    
            <div>
                <h3 className='h3'>Loading Dean Dashboard...</h3>
            </div>
       
    );
}

if (error) {
    return (
        
            <div>
                <div>
                    <h1>Dean Dashboard</h1>
                    <p>College registration monitoring</p>
                </div>

            

        </div>
    );
}

if (!dashboard) {
    return (
        <div>
            <h1>Dean Dashboard</h1>
            <p>No dashboard data available.</p>
        </div>
    );
}

const {
    totalStudents,
    activeStudents,
    inactiveStudents,
    totalApplications,
    approvedApplications,
    pendingApplications,
    rejectedApplications,
    paidPayments,
    pendingPayments,
    totalPayments,
    recentApplications,
} = dashboard;

return (
    <div className='all-continer'>
        
                <h3 className='h3'>Dean Dashboard</h3>
               
            


        {/* Student Statistics */}
        <section className='section'>
            <h2>Students Information</h2>
                    <h3 className='h3'>
                        Total Students *
                    </h3>

                    <p className='p'>
                        {totalStudents}

                     </p>
                
                    <h3 className='h3'>
                        Active Students *
                    </h3>

                    <p className='p'>
                        {activeStudents}
                    </p>
                

            
                    <h3 className='h3'>
                        Inactive Students
                    </h3>

                    <p className=''>
                        {inactiveStudents}
                    </p>
                

        </section>

        {/* Application Statistics */}
        <section className='section'>
            <h3 className='h3'>Applications</h3>

          

                
                    <h3 className='h3'>
                        Total Applications
                        </h3>

                    <p className='p'>
                        {totalApplications}
                    </p>
            

                
                    <h3 className=''>
                        Approved
                    </h3>

                    <p className='p'>
                        {approvedApplications}
                    </p>
                

              
                    <h3 className='h3'>
                        Pending
                    </h3>

                    <h3 className='h3'>
                        {pendingApplications}
                    </h3>
                

                
                    <h3 className='h3'>
                        Rejected
                    </h3>

                    <p className='p'>
                        {rejectedApplications}
                    </p>
                

            
        </section>

        {/* Payment Statistics */}
        <section className='section'>
            <h2>Payments</h2>

        

              
                    <h3 className='h3'>
                        Total Payments
                    </h3>

                    <p className='p'>
                        {totalPayments}
                    </p>
                

                
                    <h3 className='h3'>
                        Paid
                    </h3>

                    <p className='p'>
                        {paidPayments}
                    </p>
                

                
                    <h3 className='h3'>
                        Pending
                    </h3>

                    <p className='p'>
                        {pendingPayments}
                    </p>
        </section>

        {/* Recent Applications */}
        <section>
        
            
                    <h3 className='h3'>Recent Applications</h3>
                

                <button className='button'
                    onClick={() => navigate('/dean/students')}
                >
                    View Students
                </button>
            

            

                <table className='table' border={1}>

                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Email</th>
                            <th>Program</th>
                            <th>Academic Year</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {recentApplications.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                >
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            recentApplications.map((application) => (
                                <tr
                                    key={application.application_id}
                                >
                                    <td>
                                        {application.first_name}{' '}
                                        {application.last_name}
                                    </td>

                                    <td>
                                        {application.email}
                                    </td>

                                    <td>
                                        {application.program_name}
                                    </td>

                                    <td>
                                        {application.academic_year}
                                    </td>

                                    <td>
                                        <span>
                                            {application.status}
                                        </span>
                                    </td>

                                    <td>
                                        {application.submitted_at
                                            ? new Date(
                                                application.submitted_at
                                            ).toLocaleDateString()
                                            : '-'}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

        
        </section>

    </div>
);


};

export default Dashboard;
