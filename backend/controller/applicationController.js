const {
    createService,
    getMyApplication,
    submitApplication,
    getAllApplications,
    getApplicationById,
    approveApplication,
    rejectApplication,
    sendApplicationComment
} = require('../service/applicationService');


// =====================================================
// STUDENT: CREATE APPLICATION
// =====================================================

const application = async (req, res) => {
    try {

        const { program_id, academic_year } = req.body;

        const userId = req.user.user_id;

        if (!program_id || !academic_year) {
            return res.status(400).json({
                message: "Program and academic year are required"
            });
        }

        const result = await createService(
            userId,
            program_id,
            academic_year
        );

        res.status(201).json({
            message: "Application created successfully",
            application_id: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create application",
            error: error.message
        });
    }
};


// =====================================================
// STUDENT: GET MY APPLICATION
// =====================================================

const getMyApplicationController = async (req, res) => {
    try {

        const userId = req.user.user_id;

        const result = await getMyApplication(userId);

        res.status(200).json({
            applications: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =====================================================
// STUDENT: SUBMIT APPLICATION
// =====================================================

const submitApplicationController = async (req, res) => {
    try {

        const { id } = req.params;

        const userId = req.user.user_id;

        const result = await submitApplication(
            id,
            userId
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Application cannot be submitted"
            });
        }

        res.status(200).json({
            message: "Application submitted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit application",
            error: error.message
        });
    }
};


// =====================================================
// REGISTRAR: GET ALL APPLICATIONS
// =====================================================

const getAllApplicationsController = async (req, res) => {
    try {

        const result = await getAllApplications();

        res.status(200).json({
            applications: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get applications",
            error: error.message
        });
    }
};


// =====================================================
// REGISTRAR: GET ONE APPLICATION
// =====================================================

const getApplicationByIdController = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await getApplicationById(id);

        if (!result) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            application: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get application",
            error: error.message
        });
    }
};


// =====================================================
// REGISTRAR: APPROVE APPLICATION
// =====================================================

const approveApplicationController = async (req, res) => {
    try {

        const { id } = req.params;

        const registrarId = req.user.user_id;

        const result = await approveApplication(
            id,
            registrarId
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Application cannot be approved"
            });
        }

        res.status(200).json({
            message: "Application approved successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to approve application",
            error: error.message
        });
    }
};


// =====================================================
// REGISTRAR: REJECT APPLICATION
// =====================================================

const rejectApplicationController = async (req, res) => {
    try {

        const { id } = req.params;

        const registrarId = req.user.user_id;

        const result = await rejectApplication(
            id,
            registrarId
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Application cannot be rejected"
            });
        }

        res.status(200).json({
            message: "Application rejected successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to reject application",
            error: error.message
        });
    }
};


// =====================================================
// REGISTRAR: SEND COMMENT TO STUDENT
// =====================================================

const sendApplicationCommentController = async (req, res) => {
    try {

        const { id } = req.params;
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Comment is required"
            });
        }

        const registrarId = req.user.user_id;

        const result = await sendApplicationComment(
            id,
            registrarId,
            message
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Application not found"
            });
        }

        res.status(201).json({
            message: "Comment sent successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to send comment",
            error: error.message
        });
    }
};


module.exports = {
    application,
    getMyApplicationController,
    submitApplicationController,

    getAllApplicationsController,
    getApplicationByIdController,
    approveApplicationController,
    rejectApplicationController,
    sendApplicationCommentController
};