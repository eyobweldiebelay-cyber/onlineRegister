const express = require('express');

const router = express.Router();

const applicationController =
    require('../controller/applicationController');

const authMiddleware =
    require('../middleware/authMiddleware');

const authorize =
    require('../middleware/roleMiddleware');


// =====================================================
// STUDENT
// =====================================================

// Create application
router.post(
    "/application",
    authMiddleware,
    authorize("student"),
    applicationController.application
);


// Get my applications
router.get(
    "/getapplication",
    authMiddleware,
    authorize("student"),
    applicationController.getMyApplicationController
);


// Submit application
router.put(
    "/:id/submit",
    authMiddleware,
    authorize("student"),
    applicationController.submitApplicationController
);


// =====================================================
// REGISTRAR
// =====================================================

// Get pending applications
router.get(
    "/registrar/applications",
    authMiddleware,
    authorize("registrar"),
    applicationController.getAllApplicationsController
);


// Get one application
router.get(
    "/registrar/applications/:id",
    authMiddleware,
    authorize("registrar"),
    applicationController.getApplicationByIdController
);


// Approve
router.put(
    "/registrar/applications/:id/approve",
    authMiddleware,
    authorize("registrar"),
    applicationController.approveApplicationController
);


// Reject
router.put(
    "/registrar/applications/:id/reject",
    authMiddleware,
    authorize("registrar"),
    applicationController.rejectApplicationController
);


// Comment
router.post(
    "/registrar/applications/:id/comment",
    authMiddleware,
    authorize("registrar"),
    applicationController.sendApplicationCommentController
);


module.exports = router;