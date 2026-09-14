
import React, { useEffect, useState } from "react";
import api from "../../api";

function Comments() {

    // ==============================
    // COMMENTS
    // ==============================
    const [comments, setComments] = useState([]);


    // ==============================
    // RECEIVER
    // ==============================
    const [receiverId, setReceiverId] = useState("");

    const [receivers, setReceivers] = useState([]);


    // ==============================
    // SEND TYPE
    // ==============================
    // one = send to one student
    // all = send to all students
    const [sendType, setSendType] = useState("one");


    // ==============================
    // MESSAGE
    // ==============================
    const [message, setMessage] = useState("");


    // ==============================
    // SENDING STATE
    // ==============================
    const [sending, setSending] = useState(false);


    // ==============================
    // LOAD DATA
    // ==============================
    useEffect(() => {

        getComments();

        getReceivers();

    }, []);


    // ==============================
    // GET RECEIVED COMMENTS
    // Registrar receives comments
    // from Dean
    // ==============================
    const getComments = async () => {

        try {

            const response = await api.get("/my");

            setComments(
                response.data.comments || []
            );

        } catch (error) {

            console.error(
                "Error getting comments:",
                error
            );

        }
    };


    // ==============================
    // GET STUDENTS
    // Registrar can send comments
    // only to Students
    // ==============================
    const getReceivers = async () => {

        try {

            const response = await api.get("/comment");

            setReceivers(
                response.data.users || []
            );

        } catch (error) {

            console.error(
                "Error getting students:",
                error
            );

        }
    };


    // ==============================
    // SEND COMMENT
    // ==============================
    const sendComment = async (e) => {

        e.preventDefault();


        // ==================================
        // CHECK MESSAGE
        // ==================================

        if (!message.trim()) {

            alert(
                "Please write a message"
            );

            return;
        }


        // ==================================
        // CHECK ONE STUDENT
        // ==================================

        if (
            sendType === "one" &&
            !receiverId
        ) {

            alert(
                "Please select a student"
            );

            return;
        }


        try {

            setSending(true);


            // ==================================
            // SEND TO ONE STUDENT
            // ==================================

            if (sendType === "one") {

                await api.post("/comment", {

                    receiver_id: receiverId,

                    message: message.trim()

                });


                alert(
                    "Comment sent successfully"
                );

            }


            // ==================================
            // SEND TO ALL STUDENTS
            // ==================================

            else {

                await api.post("/comment", {

                    receiver_id: "all",

                    message: message.trim()

                });


                alert(
                    "Comment sent to all students successfully"
                );

            }


            // ==================================
            // CLEAR FORM
            // ==================================

            setReceiverId("");

            setMessage("");


        } catch (error) {

            console.error(
                "Error sending comment:",
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
    // MARK COMMENT AS READ
    // ==============================
    const markAsRead = async (id) => {

        try {

            await api.put(
                `/${id}/read`
            );


            // Update status immediately
            setComments(
                (previousComments) =>

                    previousComments.map(
                        (comment) =>

                            comment.comment_id === id
                                ? {
                                    ...comment,
                                    is_read: 1
                                }
                                : comment
                    )
            );


        } catch (error) {

            console.error(
                "Error marking comment:",
                error
            );

        }
    };


    // ==============================
    // REFRESH COMMENTS
    


  
    return (

        <div className="all-continer">


            


            {/* =========================
                SEND COMMENT
            ========================= */}

            <strong className="strong">
                Send Comment for one student or all student check radio button below
            </strong>


            <form
                onSubmit={sendComment}
                className="form"
            >


                {/* =========================
                    SEND TO
                ========================= */}

                <div>

                    <label>
                        Send To
                    </label>


                    <div>

                        {/* ONE STUDENT */}

                        <label>

                            <input
                                type="radio"
                                name="sendType"
                                value="one"
                                checked={
                                    sendType === "one"
                                }
                                onChange={() => {

                                    setSendType("one");

                                }}
                            />

                            {" "}
                            One Student

                        </label>


                        {"   "}


                        {/* ALL STUDENTS */}

                        <label>

                            <input
                                type="radio"
                                name="sendType"
                                value="all"
                                checked={
                                    sendType === "all"
                                }
                                onChange={() => {

                                    setSendType("all");

                                    setReceiverId("");

                                }}
                            />

                            {" "}
                            All Students

                        </label>

                    </div>

                </div>


                <br />


                {/* =========================
                    STUDENT SELECT
                ========================= */}

                {sendType === "one" && (

                    <div>

                        <label>
                            Student
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
                                Sent to students select one here
                            </option>


                            {receivers.map(
                                (user) => (

                                    <option
                                        key={
                                            user.user_id
                                        }
                                        value={
                                            user.user_id
                                        }
                                    >

                                        {user.username}
                                        {" - "}
                                        {user.role}
                                        {" - ID: "}
                                        {user.user_id}

                                    </option>

                                )
                            )}

                        </select>

                    </div>

                )}


                {/* =========================
                    ALL STUDENTS INFORMATION
                ========================= */}

                {sendType === "all" && (

                    <div>

                        <p className="p">

                            <strong>
                              For  All Students sent
                            </strong>

                        </p>


                        <p className="p">

                            This message will be sent
                            to all registered students.

                        </p>

                    </div>

                )}


                <br />


                {/* =========================
                    MESSAGE
                ========================= */}

                <textarea
                    className="texarea"
                    placeholder="Write your comment..."
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    rows="6"
                />


                <br />


                {/* =========================
                    SEND BUTTON
                ========================= */}

                <button
                    type="submit"
                    className="button"
                    disabled={sending}
                >

                    {sending
                        ? "Sending..."
                        : "Send Comment"
                    }

                </button>

            </form>


            <hr />


            {/* =========================
                RECEIVED COMMENTS
            ========================= */}

            <strong className="p">
                Received Comments From  Dean so read it below
            </strong>


            <br />
            <br />

            <br />


            {/* =========================
                NO COMMENTS
            ========================= */}

            {comments.length === 0 ? (

                <p className="p">
                    No comments found.
                </p>

            ) : (


                // =========================
                // COMMENT LIST
                // =========================

                comments.map(
                    (comment) => (
           
                        <div
                            key={
                                comment.comment_id
                            }
                            className="key"
                        >


                            {/* =====================
                                SENDER
                            ===================== */}
                
                            <p className="p">

                                <strong>
                                    From :
                                </strong>{" "}

                                {comment.sender_name}

                            </p>


                            {/* =====================
                                ROLE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Role:
                                </strong>{" "}

                                {comment.sender_role}

                            </p>


                            {/* =====================
                                MESSAGE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Message:
                                </strong>{" "}

                                {comment.message}

                            </p>


                            {/* =====================
                                DATE
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Date:
                                </strong>{" "}

                                {new Date(
                                    comment.created_at
                                ).toLocaleString()}

                            </p>


                            {/* =====================
                                STATUS
                            ===================== */}

                            <p className="p">

                                <strong>
                                    Status:
                                </strong>{" "}

                                {comment.is_read
                                    ? "Read"
                                    : "Unread"
                                }

                            </p>


                            {/* =====================
                                MARK AS READ
                            ===================== */}

                            {!comment.is_read && (

                                <button
                                    className="button"
                                    onClick={() =>
                                        markAsRead(
                                            comment.comment_id
                                        )
                                    }
                                >
                                    Mark as Read
                                </button>

                            )}


                            <hr />

                        </div>

                    )
                )

            )}

        </div>

    );
}

export default Comments;

