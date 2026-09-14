
const {
    createCommentService,
    createCommentForAllStudentsService,
    getMyCommentsService,
    markAsReadService,
    getCommentReceiversService
} = require("../service/commentService");


// =====================================================
// CREATE COMMENT
// =====================================================

const createComment = async (req, res) => {

    try {

        const {
            receiver_id,
            message
        } = req.body;


        const senderId = req.user.user_id;
        const senderRole = req.user.role;


        // -------------------------------------------------
        // CHECK MESSAGE
        // -------------------------------------------------

        if (!message || !message.trim()) {

            return res.status(400).json({
                message: "Message is required"
            });

        }


        // -------------------------------------------------
        // CHECK RECEIVER
        // -------------------------------------------------

        if (
            receiver_id === undefined ||
            receiver_id === null ||
            receiver_id === ""
        ) {

            return res.status(400).json({
                message: "Receiver is required"
            });

        }


        // =================================================
        // REGISTRAR → ALL STUDENTS
        // =================================================

        if (receiver_id === "all") {


            // Only Registrar can send to all students

            if (senderRole !== "registrar") {

                return res.status(403).json({
                    message:
                        "Only Registrar can send comments to all students"
                });

            }


            const result =
                await createCommentForAllStudentsService(
                    senderId,
                    message.trim()
                );


            return res.status(201).json({

                message:
                    "Comment sent to all students",

                students_count:
                    result.affectedRows

            });

        }


        // =================================================
        // SEND TO ONE RECEIVER
        // =================================================

        const receiverId = Number(receiver_id);


        // Check valid ID

        if (!Number.isInteger(receiverId)) {

            return res.status(400).json({
                message: "Invalid receiver"
            });

        }


        // =================================================
        // CHECK COMMUNICATION RULES
        // =================================================

        // -----------------------------------------------
        // DEAN
        // Dean → Registrar / Student
        // -----------------------------------------------

        if (senderRole === "dean") {

            const [receiver] = await require("../db/dbConfig")
                .query(
                    `SELECT role
                     FROM users
                     WHERE user_id = ?`,
                    [receiverId]
                );


            if (
                receiver.length === 0 ||
                !["registrar", "student"]
                    .includes(receiver[0].role)
            ) {

                return res.status(403).json({
                    message:
                        "Dean can only send comments to Registrar or Student"
                });

            }

        }


        // -----------------------------------------------
        // REGISTRAR
        // Registrar → Student
        // -----------------------------------------------

        else if (senderRole === "registrar") {

            const [receiver] = await require("../db/dbConfig")
                .query(
                    `SELECT role
                     FROM users
                     WHERE user_id = ?`,
                    [receiverId]
                );


            if (
                receiver.length === 0 ||
                receiver[0].role !== "student"
            ) {

                return res.status(403).json({
                    message:
                        "Registrar can only send comments to Student"
                });

            }

        }


        // -----------------------------------------------
        // STUDENT
        // -----------------------------------------------

        else {

            return res.status(403).json({
                message:
                    "Students cannot send comments"
            });

        }


        // =================================================
        // CREATE COMMENT
        // =================================================

        const result =
            await createCommentService(
                senderId,
                receiverId,
                message.trim()
            );


        return res.status(201).json({

            message: "Comment sent",

            comment_id: result.insertId

        });

    } catch (error) {

        console.error(
            "Create comment error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to send comment",

            error:
                error.message

        });

    }
};


// =====================================================
// GET MY COMMENTS
// =====================================================

const getMyComments = async (req, res) => {

    try {

        const receiverId =
            req.user.user_id;


        const result =
            await getMyCommentsService(
                receiverId
            );


        return res.status(200).json({

            comments: result

        });

    } catch (error) {

        console.error(
            "Get comments error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to get comments",

            error:
                error.message

        });

    }
};


// =====================================================
// MARK COMMENT AS READ
// =====================================================

const markAsRead = async (req, res) => {

    try {

        const { id } =
            req.params;


        const receiverId =
            req.user.user_id;


        await markAsReadService(
            id,
            receiverId
        );


        return res.status(200).json({

            message:
                "Comment marked as read"

        });

    } catch (error) {

        console.error(
            "Mark comment as read error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to update comment",

            error:
                error.message

        });

    }
};


// =====================================================
// GET COMMENT RECEIVERS
// =====================================================

const getCommentReceivers = async (req, res) => {

    try {

        const userId =
            req.user.user_id;

        const senderRole =
            req.user.role;


        const result =
            await getCommentReceiversService(
                userId,
                senderRole
            );


        return res.status(200).json({

            success: true,

            users: result

        });

    } catch (error) {

        console.error(
            "Get comment receivers error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to get users",

            error:
                error.message

        });

    }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    createComment,

    getMyComments,

    markAsRead,

    getCommentReceivers

};

