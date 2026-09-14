
const db = require("../db/dbConfig");
// =====================================================
// CREATE ONE COMMENT
// =====================================================

const createCommentService = async (
    senderId,
    receiverId,
    message
) => {

    const [result] = await db.query(
        `INSERT INTO comments
        (sender_id, receiver_id, message)
        VALUES (?, ?, ?)`,
        [
            senderId,
            receiverId,
            message
        ]
    );

    return result;
};


// =====================================================
// CREATE COMMENT FOR ALL STUDENTS
// =====================================================

const createCommentForAllStudentsService = async (
    senderId,
    message
) => {

    const [result] = await db.query(
        `INSERT INTO comments
        (sender_id, receiver_id, message)

        SELECT
            ?,
            user_id,
            ?

        FROM users

        WHERE role = 'student'`,
        [
            senderId,
            message
        ]
    );

    return result;
};


// =====================================================
// GET MY COMMENTS
// =====================================================

const getMyCommentsService = async (
    receiverId
) => {

    const [result] = await db.query(
        `SELECT
            c.comment_id,
            c.message,
            c.is_read,
            c.created_at,

            u.username AS sender_name,
            u.role AS sender_role

        FROM comments c

        JOIN users u
            ON c.sender_id = u.user_id

        WHERE c.receiver_id = ?

        ORDER BY c.created_at DESC`,
        [
            receiverId
        ]
    );

    return result;
};


// =====================================================
// MARK COMMENT AS READ
// =====================================================

const markAsReadService = async (
    commentId,
    receiverId
) => {

    const [result] = await db.query(
        `UPDATE comments

        SET is_read = TRUE

        WHERE comment_id = ?

        AND receiver_id = ?`,
        [
            commentId,
            receiverId
        ]
    );

    return result;
};


// =====================================================
// GET COMMENT RECEIVERS
// =====================================================

const getCommentReceiversService = async (
    userId,
    senderRole
) => {

    let allowedRoles = [];


    // -------------------------------------------------
    // DEAN
    // Dean can send to Registrar and Student
    // -------------------------------------------------

    if (senderRole === "dean") {

        allowedRoles = [
            "registrar",
            "student"
        ];

    }


    // -------------------------------------------------
    // REGISTRAR
    // Registrar can send only to Student
    // -------------------------------------------------

    else if (senderRole === "registrar") {

        allowedRoles = [
            "student"
        ];

    }


    // -------------------------------------------------
    // STUDENT
    // Student cannot send comments
    // -------------------------------------------------

    else {

        return [];

    }


    const placeholders = allowedRoles
        .map(() => "?")
        .join(",");


    const [result] = await db.query(
        `SELECT
            user_id,
            username,
            email,
            role

        FROM users

        WHERE user_id != ?

        AND role IN (${placeholders})

        ORDER BY
            role ASC,
            username ASC`,
        [
            userId,
            ...allowedRoles
        ]
    );


    return result;
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    createCommentService,

    createCommentForAllStudentsService,

    getMyCommentsService,

    markAsReadService,

    getCommentReceiversService

};

