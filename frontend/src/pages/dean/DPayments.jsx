import { useEffect, useState } from "react";
import api from "../../api";

const Payments = () => {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");


    // ===============================
    // GET ALL PAYMENTS
    // ===============================

    const fetchPayments = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get("/payments/dean");

            setPayments(
                response.data.payments || []);

        } catch (error) {

            console.error(
                "Dean payments error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load payments"
            );

        } finally {

            setLoading(false);

        }
    };


    // ===============================
    // LOAD WHEN PAGE OPENS
    // ===============================

    useEffect(() => {

        fetchPayments();

    }, []);


    // ===============================
    // FILTER PAYMENTS
    // ===============================

    const filteredPayments = payments.filter((payment) => {

            const fullName = `
                ${payment.first_name || ""}
                ${payment.middle_name || ""}
                ${payment.last_name || ""}`.toLowerCase();

            const email =(payment.email || "").toLowerCase();

            const searchValue =search.toLowerCase();


            const matchesSearch =
                fullName.includes(searchValue) ||
                email.includes(searchValue);


            const matchesStatus =
                statusFilter === "" ||
                payment.payment_status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        }
    );


    // ===============================
    // TOTAL
    // ===============================

    const totalPayments = payments.length;


    const paidPayments = payments.filter((payment) => payment.payment_status === "paid").length;


    const pendingPayments =payments.filter((payment) =>payment.payment_status === "pending").length;


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (
            <div>

                <strong className="strong">Payments</strong>

                <p className="p">
                    Loading payments...
                </p>

            </div>
        );
    }


    // ===============================
    // PAGE
    // ===============================

    return (

        <div>

            {/* HEADER */}

            <div>

                <strong className="strong">
                    Payments
                </strong>

                

            </div>


            {/* ERROR */}

            {error && (

                <div>

                    <p className="p">
                        {error}
                    </p>

                    <button className="button"
                        onClick={fetchPayments}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* SUMMARY */}

            <div>

                <div>

                    <strong className="strong">
                        Total Payments *
                    </strong>

                    <p className="p">
                        {totalPayments}
                    </p>

                </div>


                <div>

                    <strong className="strong">
                        Paid
                    </strong>

                    <p className="p">
                        {paidPayments}
                    </p>

                </div>


                <div>

                    <h3 className="h3">
                        Pending
                    </h3>

                    <p>
                        {pendingPayments}
                    </p>

                </div>

            </div>


            {/* SEARCH AND FILTER */}

            <div>

                <input className="input"
                    type="text"
                    placeholder="Search student name or email"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select className="select"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >
               <div className="option">
                    <option value="">
                        All Status
                    </option>

                    <option value="paid">
                        Paid
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="failed">
                        Failed
                    </option>
                    </div>

                </select>

            </div>


            {/* PAYMENTS TABLE */}

            <div>

                <table className="table" border={1}>

                    <thead>

                        <tr>

                            <th>
                                Student Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                            Payment Method
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Transaction Reference
                            </th>

                            <th>
                                Date
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredPayments.length === 0 ? (

                            <tr>

                                <td colSpan="8">

                                    No payments found.

                                </td>

                            </tr>

                        ) : (

                            filteredPayments.map(
                                (payment) => (

                                    <tr
                                        key={
                                            payment.payment_id
                                        }
                                    >

                                        {/* STUDENT */}

                                        <td>

                                            {
                                                payment.first_name
                                            }{" "}

                                            {
                                                payment.middle_name
                                                    ? payment.middle_name + " "
                                                    : ""
                                            }

                                            {
                                                payment.last_name
                                            }

                                        </td>


                                        {/* EMAIL */}

                                        <td>
                                            {
                                                payment.email
                                            }
                                        </td>


                                        {/* PROGRAM */}

                                        <td>
                                            {
                                                payment.program_name ||
                                                "Not assigned"
                                            }
                                        </td>


                                        {/* AMOUNT */}

                                        <td>
                                            {
                                                payment.amount
                                            }{" "}
                                            ETB
                                        </td>


                                        {/* METHOD */}

                                        <td>
                                            {
                                                payment.payment_method
                                            }
                                        </td>


                                        {/* STATUS */}

                                        <td>
                                            {
                                                payment.payment_status
                                            }
                                        </td>


                                        {/* TRANSACTION */}

                                        <td>
                                            {
                                                payment.transaction_reference ||
                                                "-"
                                            }
                                        </td>


                                        {/* DATE */}

                                        <td>

                                            {
                                                payment.payment_date
                                                    ? new Date(
                                                        payment.payment_date
                                                    ).toLocaleString()
                                                    : "-"
                                            }

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Payments;