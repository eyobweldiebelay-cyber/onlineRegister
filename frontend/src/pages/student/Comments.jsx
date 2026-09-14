
import React, { useEffect, useState } from "react";
import api from "../../api";

function Comments() {

    // ==============================
    // COMMENTS
    // ==============================
    const [comments, setComments] = useState([]);

    // ==============================
    // PAGE MESSAGE
    // ==============================
    const [message, setMessage] = useState("");


    // ==============================
    // LOAD COMMENTS
    // ==============================
    useEffect(() => {

        getComments();

    }, []);


    // ==============================
    // GET COMMENTS
    // Student receives comments
    // from Dean and Registrar
    // ==============================
    const getComments = async () => {

        try {

            setMessage("");

            const response = await api.get("/my");

            setComments(
                response.data.comments || []
            );

        } catch (error) {

            console.error(
                "Error fetching comments:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to load comments."
            );

        }
    };


    // ==============================
    // MARK COMMENT AS READ
    // ==============================
    const markAsRead = async (commentId) => {

        try {

            await api.put(
                `/${commentId}/read`
            );


            // Update status immediately
            setComments((previousComments) =>

                previousComments.map(
                    (comment) =>

                        comment.comment_id === commentId
                            ? {
                                ...comment,
                                is_read: 1
                            }
                            : comment
                )

            );


        } catch (error) {

            console.error(
                "Error marking comment as read:",
                error
            );

        }
    };


    // ==============================
    // PAGE
    // ==============================
    return (

        <div className="all-continer">


            {/* =========================
                PAGE TITLE
            ========================= */}

            <h3 className="h3">
                COMMENTS
            </h3>


            {/* =========================
                MESSAGE
            ========================= */}

            {message && (

                <p className="p">
                    {message}
                </p>

            )}


            {/* =========================
                REFRESH BUTTON
            ========================= */}

            <button
                className="button"
                onClick={getComments}
            >
                Refresh
            </button>


            <br />
            <br />


            {/* =========================
                COMMENTS
            ========================= */}

            <div>

                {comments.length === 0 ? (

                    <p className="p">
                        No comments or feedback yet.
                    </p>

                ) : (

                    comments.map((item) => (

                        <div
                            key={item.comment_id}
                            className="key"
                        >


                            {/* =====================
                                SENDER
                            ===================== */}

                            <p className="p">

                                <strong>
                                    From:
                                </strong>{" "}

                                {item.sender_name}

                            </p>


                            {/* =====================
                                ROLE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Role:
                                </strong>{" "}

                                {item.sender_role}

                            </p>


                            {/* =====================
                                MESSAGE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Message:
                                </strong>{" "}

                                {item.message}

                            </p>


                            {/* =====================
                                DATE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Date:
                                </strong>{" "}

                                {new Date(
                                    item.created_at
                                ).toLocaleString()}

                            </p>


                            {/* =====================
                                STATUS
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Status:
                                </strong>{" "}

                                {item.is_read
                                    ? "Read"
                                    : "Unread"
                                }

                            </p>


                            {/* =====================
                                MARK AS READ
                            ===================== */}

                            {!item.is_read && (

                                <button
                                    className="button"
                                    onClick={() =>
                                        markAsRead(
                                            item.comment_id
                                        )
                                    }
                                >
                                    Mark as Read
                                </button>

                            )}

                        </div>

                    ))

                )}

            </div>


        </div>

    );
}

export default Comments;

