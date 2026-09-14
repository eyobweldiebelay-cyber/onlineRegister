import { useEffect, useState } from 'react';
import api from '../../api';

const Reports = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await api.get('/reports/dean');

            setReport(response.data.data);

        } catch (error) {
            console.error('Dean report error:', error);

            setError(
                error.response?.data?.message ||
                'Failed to load Dean report'
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h1>Dean Reports</h1>
                <p>Loading report...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h3 className='h3'>Dean Reports</h3>

                <p className='p'>{error}</p>

                <button onClick={fetchReport}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!report) {
        return (
            <div>
                <h1>Dean Reports</h1>
                <p>No report data available.</p>
            </div>
        );
    }

    const students = report.studentSummary;
    const applications = report.applicationSummary;
    const payments = report.paymentSummary;

    return (
        <div className='all-continer'>

            {/* PAGE HEADER */}
            <div>
                <h3 className='h3'>Reports</h3>
                <p className='p'>Monitor student, application and payment information</p>
            </div>


            {/* STUDENT SUMMARY */}
            <div>
                <strong className='h3'>Student Summary</strong>

                <div>
                    <div>
                        <strong className='strong'>Total Students *</strong>
                        <strong className='p'>{students.totalStudents}</strong>
                    </div>

                    <div>
                        <strong className='strong'>Active Students *</strong>
                        <p className='p'>{students.activeStudents}</p>
                    </div>

                    <div>
                        <strong className='strong'>Inactive Students *</strong>
                        <strong className='strong'>{students.inactiveStudents}</strong>
                    </div>
                </div>
            </div>


            {/* APPLICATION SUMMARY */}
            <div>
                <h3 className='h3'>Application Summary </h3>

                <div>
                    <div>
                        <strong className='strong'>Total Applications</strong>
                        <strong className='h3'>{applications.totalApplications}</strong>
                    </div>

                    <div>
                        <strong className='h3'>Approved</strong>
                        <p className='p'>{applications.approvedApplications}</p>
                    </div>

                    <div>
                        <h3 className='h3'>Pending</h3>
                        <strong className='p'>{applications.pendingApplications}</strong>
                    </div>

                    <div>
                        <h3 className='h3'>Rejected</h3>
                        <p className='p'>{applications.rejectedApplications}</p>
                    </div>
                </div>
            </div>


            {/* PAYMENT SUMMARY */}
            <div>
                <h3 className='3'>Payment Summary *</h3>

                <div>
                    <div>
                        <p>Total Payments</p>
                        <strong className='h3'>{payments.totalPayments}</strong>
                    </div>

                    <div>
                        <h3 className='h3'>Paid</h3>
                        <p>{payments.paidPayments}</p>
                    </div>

                    <div>
                        <h3>Pending</h3>
                        <p>{payments.pendingPayments}</p>
                    </div>

                    <div>
                        <strong className='h3'>Failed</strong>
                        <p>{payments.failedPayments}</p>
                    </div>

                    <div>
                        <h3 className='h3'>Total Paid Amount*</h3>
                        <h3 className='p'>
                           <b> {Number(payments.totalPaidAmount).toLocaleString()}</b> ETB
                        </h3>
                    </div>
                </div>
            </div>


            {/* REFRESH */}
            <div>
                <button onClick={fetchReport}>
                    Refresh Report
                </button>
            </div>

        </div>
    );
};

export default Reports;