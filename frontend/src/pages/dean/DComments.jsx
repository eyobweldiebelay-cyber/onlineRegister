
import { useEffect, useState } from "react";
import api from "../../api";

const Comments = () => {

    // ==============================
    // COMMENTS
    // ==============================
    const [comments, setComments] = useState([]);

    // ==============================
    // PAGE STATE
    // ==============================
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==============================
    // SEND COMMENT STATE
    // ==============================
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    // List of users that Dean can send comments to
    const [receivers, setReceivers] = useState([]);


    // ==============================
    // LOAD DATA WHEN PAGE OPENS
    // ==============================
    useEffect(() => {
        fetchComments();
        fetchReceivers();
    }, []);


    // ==============================
    // GET RECEIVED COMMENTS
    // ==============================
    const fetchComments = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/my");

            setComments(response.data.comments || []);

        } catch (error) {

            console.error("Dean comments error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load comments"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==============================
    // GET RECEIVERS
    // ==============================
    const fetchReceivers = async () => {

        try {

            const response = await api.get("/comment");

            setReceivers(response.data.users || []);

        } catch (error) {

            console.error(
                "Failed to load comment receivers:",
                error
            );

        }
    };


    // ==============================
    // MARK COMMENT AS READ
    // ==============================
    const markAsRead = async (commentId) => {

        try {

            await api.put(`/${commentId}/read`);

            setComments((prevComments) =>
                prevComments.map((comment) =>
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
                "Mark comment as read error:",
                error
            );

        }
    };


    // ==============================
    // SEND COMMENT
    // ==============================
    const sendComment = async (e) => {

        e.preventDefault();


        // Check receiver
        if (!receiverId) {

            alert("Please select a receiver");

            return;
        }


        // Check message
        if (!message.trim()) {

            alert("Please write a message");

            return;
        }


        try {

            setSending(true);


            // Send comment to backend
            await api.post("/comment", {

                receiver_id: receiverId,

                message: message.trim()

            });


            alert("Comment sent successfully");


            // Clear form
            setReceiverId("");
            setMessage("");


        } catch (error) {

            console.error(
                "Send comment error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to send comment"
            );

        } finally {

            setSending(false);

        }
    };


    // ==============================
    // LOADING
    // ==============================
    if (loading) {

        return (

            <div>

                <h1>Dean Comments</h1>

                <p>
                    Loading comments...
                </p>

            </div>

        );
    }


    // ==============================
    // ERROR
    // ==============================
    if (error) {

        return (

            <div>

                <h1>Dean Comments</h1>

                <p>
                    {error}
                </p>

                <button
                    onClick={fetchComments}
                >
                    Try Again
                </button>

            </div>

        );
    }


    // ==============================
    // PAGE
    // ==============================
    return (

        <div className="all-continer">


            {/* =========================
                PAGE HEADER
            ========================= */}

            <div>

                <h3 className="h3">
                    Comments
                </h3>

                <p className="p">
                    View and send comments
                </p>

            </div>


            {/* =========================
                SEND COMMENT
            ========================= */}

            <div>

                <h3 className="h3">
                    Send Comment
                </h3>


                <form
                    onSubmit={sendComment}
                    className="form"
                >


                    {/* =====================
                        RECEIVER
                    ===================== */}

                    <div>

                        <label>
                            Receiver
                        </label>


                        <select
                            className="input"
                            value={receiverId}
                            onChange={(e) =>
                                setReceiverId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select receiver
                            </option>


                            {receivers.map((user) => (

                                <option
                                    key={user.user_id}
                                    value={user.user_id}
                                >

                                    {user.username}
                                    {" - "}
                                    {user.role}
                                    {" - ID: "}
                                    {user.user_id}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* =====================
                        MESSAGE
                    ===================== */}

                    <div>

                        <label>
                            Message
                        </label>


                        <textarea
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            placeholder="Write your comment"
                            rows="4"
                        />

                    </div>


                    {/* =====================
                        SEND BUTTON
                    ===================== */}

                    <button
                        className="button"
                        type="submit"
                        disabled={sending}
                    >

                        {sending
                            ? "Sending..."
                            : "Send Comment"
                        }

                    </button>


                </form>

            </div>


            {/* =========================
                RECEIVED COMMENTS
            ========================= */}

            <div>

                <h3 className="h3">
                    Received Comments
                </h3>


                <button
                    onClick={fetchComments}
                >
                    Refresh
                </button>


                {comments.length === 0 ? (

                    <p>
                        No comments found.
                    </p>

                ) : (

                    <table
                        className="table"
                        border={1}
                    >

                        <thead>

                            <tr>

                                <th>
                                    Reciver
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Message
                                </th>

                                <th>
                                    Date
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

                            {comments.map((comment) => (

                                <tr
                                    key={comment.comment_id}
                                    className="key"
                                >

                                    <td>
                                        {comment.sender_name}
                                    </td>


                                    <td>
                                        {comment.sender_role}
                                    </td>


                                    <td>
                                        {comment.message}
                                    </td>


                                    <td>
                                        {new Date(
                                            comment.created_at
                                        ).toLocaleString()}
                                    </td>


                                    <td>
                                        {comment.is_read
                                            ? "Read"
                                            : "Unread"
                                        }
                                    </td>


                                    <td>

                                        {!comment.is_read && (

                                            <button
                                                onClick={() =>
                                                    markAsRead(
                                                        comment.comment_id
                                                    )
                                                }
                                            >
                                                Mark as Read
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>


        </div>

    );
};

export default Comments;

