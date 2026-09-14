import { useEffect, useState } from 'react';
import api from '../../api';

const Reports = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        registrarReport();
    }, []);

    const registrarReport = async () => {
        try {
            setLoading(true);
            setError('');

         

            const response = await api.get('/reports/registrar');

            setReport(response.data.data);

        } catch (error) {
            console.error('Report error:', error);

            setError(
                error.response?.data?.message ||
                'Failed to load registrar report'
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="reports-page">
                <h3 className='h3'>Registrar Report</h3>
                <p className='p'>Loading report...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reports-page">
                <h3>Registrar Reports</h3>

                <div className="report-error">
                    {error}
                </div>

                <button
                    className="report-button"
                    onClick={registrarReport}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="all-continer">
                <h1>Registrar Reports</h1>
                <p>No report data available.</p>
            </div>
        );
    }

    const application = report.applicationSummary;
    const students = report.studentSummary;
    const programs = report.programSummary;

    return (
        <div className="all-continer">

        
            
                    <h3 className='h3'>Registrar Reports</h3>

                  
            

               
        

            {/* Application Summary */}
            <section className="section">
                <strong className='strong'>Application Summary</strong>

                <div className="top-cards">

                    <div className="report-card">
                        <p className='p'>Total Applications *</p>
                        <h3 className='h3'>
                            {application.totalApplications}
                        </h3>
                    </div>

                    <div className="report-card">
                        <strong className='strong'>Pending</strong>
                        <h3 className='h3'>
                            {application.pendingApplications}
                        </h3>
                    </div>

                    <div className="report-card">
                        <strong className='strong'>Approved</strong>
                        <h3 className='h3'>
                            {application.approvedApplications}
                        </h3>
                    </div>

                    <div className="report-card">
                        <strong className='strong'>Rejected</strong>
                        <h3 clash3>
                            {application.rejectedApplications}
                        </h3>
                    </div>

                </div>
            </section>

            {/* Student Summary */}
            <section className="section">
                <h3 className='h3'>Student Summary</h3>

                <div className="report-cards">

                    <div className="report-card">
                        <p className='p'>Total Students *</p>
                        <h3>
                            {students.totalStudents}
                        </h3>
                    </div>

                    <div className="report-card">
                        <p className='p'>Active Students *</p>
                        <h3 className='h3'>
                            {students.activeStudents}
                        </h3>
                    </div>

                    <div className="report-card">
                        <p className='p'>Inactive Students *</p>
                        <h3 className='h3'>
                            {students.inactiveStudents}
                        </h3>
                    </div>

                </div>
            </section>

            {/* Program Summary */}
            <section className="section">
                <strong className='strong'>Number Of Applications with Department *</strong>

                <div className="report-table-container">

                    <table className="table" border={1}>

                        <thead>
                            <tr>
                                <th> Department</th>
                                <th>Applications</th>
                            </tr>
                        </thead>

                        <tbody>
                            {programs.length === 0 ? (
                                <tr>
                                    <td colSpan="2">
                                        No programs found.
                                    </td>
                                </tr>
                            ) : (
                                programs.map((program) => (
                                    <tr key={program.programName}>
                                        <td>
                                            {program.programName}
                                        </td>

                                        <td>
                                            {program.totalApplications}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
            </section>

        </div>
    );
};

export default Reports;