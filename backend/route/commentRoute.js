const express = require("express");

const router = express.Router();

const commentController =
    require("../controllers/commentController");


router.post(
    "/",
    authMiddleware,
    commentController.createComment
);


router.get(
    "/my",
    authMiddleware,
    commentController.getMyComments
);


router.put(
    "/:id/read",
    authMiddleware,
    commentController.markAsRead
);


module.exports = router;