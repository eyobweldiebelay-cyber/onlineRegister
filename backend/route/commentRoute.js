const express = require("express");
 const router = express.Router(); 
 const commentController = require("../controller/commentController");
  const authMiddleware = require("../middleware/authMiddleware");
   const roleAuth = require("../middleware/roleMiddleware");
    // ===============================
    //  // SEND COMMENT // Dean -> Registrar / Student // Registrar -> Student // Student -> Nobody // =============================== 
    router.post( "/comment", authMiddleware, roleAuth("dean", "registrar"), commentController.createComment ); // =============================== // GET MY COMMENTS // Dean -> can receive // Registrar -> can receive // Student -> can receive // =============================== 
    router.get( "/my", authMiddleware, roleAuth("dean", "registrar", "student"), commentController.getMyComments ); // =============================== // GET RECEIVERS // Dean -> Registrar + Student // Registrar -> Student // Student -> Nobody // =============================== 
    router.get( "/comment", authMiddleware, roleAuth("dean", "registrar"), commentController.getCommentReceivers ); // =============================== // MARK COMMENT AS READ // =============================== 
    router.put( "/:id/read", authMiddleware, roleAuth("dean", "registrar", "student"), commentController.markAsRead ); 
    module.exports = router;