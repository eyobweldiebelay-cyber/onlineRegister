
import React, { useEffect, useState } from "react";
import api from "../../api"
import "../../css/applicationregister.css";
function Application() {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApplications();
    }, []);

    const getApplications = async () => {
        try {
            const response = await api.get(
                "/registrar/applications"
            );

            setApplications(
                response.data.applications || []
            );
        } catch (error) {
            console.error(
                "Error fetching applications:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const viewApplication = async (id) => {
        try {
            const response = await api.get(
                `/registrar/applications/${id}`
            );

            setSelectedApplication(
                response.data.application
            );
        } catch (error) {
            console.error(
                "Error fetching application:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to load application"
            );
        }
    };

    const approveApplication = async () => {
        if (!selectedApplication) return;

        const confirmApprove = window.confirm(
            "Are you sure you want to approve this application?"
        );

        if (!confirmApprove) return;

        try {
            await api.put(
                `/registrar/applications/${selectedApplication.application_id}/approve`
            );

            alert(
                "Application approved successfully"
            );

            setSelectedApplication(null);

            await getApplications();
        } catch (error) {
            console.error(
                "Error approving application:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to approve application"
            );
        }
    };

    const rejectApplication = async () => {
        if (!selectedApplication) return;

        const confirmReject = window.confirm(
            "Are you sure you want to reject this application?"
        );

        if (!confirmReject) return;

        try {
            await api.put(
                `/registrar/applications/${selectedApplication.application_id}/reject`
            );

            alert(
                "Application rejected successfully"
            );

            setSelectedApplication(null);

            await getApplications();
        } catch (error) {
            console.error(
                "Error rejecting application:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to reject application"
            );
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "approved":
                return "status-approved";

            case "rejected":
                return "status-rejected";

            case "pending":
                return "status-pending";

            case "draft":
                return "status-draft";

            default:
                return "status-default";
        }
    };

    if (loading) {
        return (
            <div className="application-page">

                <div className="loading-box">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading applications...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="application-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <h2>
                        Student Applications
                    </h2>

                    <p>
                        Review and manage student
                        registration applications.
                    </p>

                </div>


                <div className="application-count">

                    <span>
                        Total Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>

            </div>


            {/* APPLICATION TABLE */}

            <div className="table-card">

                <div className="table-header">

                    <div>

                        <h3>
                            Applications
                        </h3>

                        <p>
                            List of submitted student
                            applications
                        </p>

                    </div>

                </div>


                <div className="table-container">

                    <table className="application-table">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Student Name
                                </th>

                                <th>
                                    Program
                                </th>

                                <th>
                                    Academic Year
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {applications.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="empty-table"
                                    >
                                        No applications found.
                                    </td>

                                </tr>

                            ) : (

                                applications.map(
                                    (application, index) => (

                                        <tr
                                            key={
                                                application.application_id
                                            }
                                        >

                                            <td>
                                                {index + 1}
                                            </td>


                                            <td>

                                                <div className="student-name">

                                                    <div className="student-avatar">

                                                        {application.first_name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}

                                                    </div>


                                                    <div>

                                                        <strong>
                                                            {
                                                                application.first_name
                                                            }{" "}
                                                            {
                                                                application.middle_name
                                                            }{" "}
                                                            {
                                                                application.last_name
                                                            }
                                                        </strong>


                                                        <small>
                                                            Application ID:{" "}
                                                            {
                                                                application.application_id
                                                            }
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>
                                                {
                                                    application.program_name
                                                }
                                            </td>


                                            <td>
                                                {
                                                    application.academic_year
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={`status-badge ${getStatusClass(
                                                        application.status
                                                    )}`}
                                                >
                                                    {
                                                        application.status
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    className="btn btn-view"
                                                    onClick={() =>
                                                        viewApplication(
                                                            application.application_id
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* APPLICATION DETAILS */}

            {selectedApplication && (

                <div className="modal-overlay">

                    <div className="application-modal">


                        {/* MODAL HEADER */}

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Application Details
                                </h2>

                                <p>
                                    Application ID:{" "}
                                    <strong>
                                        {
                                            selectedApplication.application_id
                                        }
                                    </strong>
                                </p>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() =>
                                    setSelectedApplication(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="modal-body">


                            {/* STUDENT INFORMATION */}

                            <div className="detail-section">

                                <div className="section-title">

                                    <h3>
                                        Student Information
                                    </h3>

                                </div>


                                <div className="detail-grid">

                                    <div className="detail-item">

                                        <span>
                                            Full Name
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.first_name
                                            }{" "}
                                            {
                                                selectedApplication.middle_name
                                            }{" "}
                                            {
                                                selectedApplication.last_name
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Phone
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.phone ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Sex
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.sex ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Date of Birth
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.date_of_birth ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            National ID
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.national_id ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Address
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.address ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* APPLICATION INFORMATION */}

                            <div className="detail-section">

                                <div className="section-title">

                                    <h3>
                                        Application Information
                                    </h3>

                                </div>


                                <div className="detail-grid">

                                    <div className="detail-item">

                                        <span>
                                            Program
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.program_name
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Academic Year
                                        </span>

                                        <strong>
                                            {
                                                selectedApplication.academic_year
                                            }
                                        </strong>

                                    </div>


                                    <div className="detail-item">

                                        <span>
                                            Status
                                        </span>

                                        <strong>

                                            <span
                                                className={`status-badge ${getStatusClass(
                                                    selectedApplication.status
                                                )}`}
                                            >
                                                {
                                                    selectedApplication.status
                                                }
                                            </span>

                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* DOCUMENTS */}

                            <div className="detail-section">

                                <div className="section-title">

                                    <h3>
                                        Uploaded Documents
                                    </h3>

                                </div>


                                {selectedApplication.documents &&
                                selectedApplication.documents.length >
                                    0 ? (

                                    <div className="document-table-wrapper">

                                        <table className="document-table">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Document Type
                                                    </th>

                                                    <th>
                                                        File Name
                                                    </th>

                                                    <th>
                                                        Action
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {selectedApplication.documents.map(
                                                    (document) => (

                                                        <tr
                                                            key={
                                                                document.document_id
                                                            }
                                                        >

                                                            <td>
                                                                <strong>
                                                                    {
                                                                        document.document_type
                                                                    }
                                                                </strong>
                                                            </td>


                                                            <td>
                                                                {
                                                                    document.file_name ||
                                                                    "Document"
                                                                }
                                                            </td>


                                                            <td>

                                                           <a
    className="btn btn-document"
    href={`http://localhost:8800/${document.file_path.replace(/^\/+/, "")}`}
    target="_blank"
    rel="noreferrer"
>
    View Document
</a>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                ) : (

                                    <div className="no-documents">
                                        No documents uploaded.
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div className="modal-footer">

                            <div className="decision-buttons">

                                <button
                                    className="btn btn-approve"
                                    onClick={
                                        approveApplication
                                    }
                                    disabled={
                                        selectedApplication.status ===
                                        "approved"
                                    }
                                >
                                    Approve
                                </button>


                                <button
                                    className="btn btn-reject"
                                    onClick={
                                        rejectApplication
                                    }
                                    disabled={
                                        selectedApplication.status ===
                                        "rejected"
                                    }
                                >
                                    Reject
                                </button>

                            </div>


                            <button
                                className="btn btn-close"
                                onClick={() =>
                                    setSelectedApplication(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Application;
