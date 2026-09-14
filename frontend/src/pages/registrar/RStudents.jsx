import React, { useEffect, useState } from "react";
import api from "../../api";

function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {

        try {

            const response = await api.get("/registrar/students");

            setStudents(response.data.students || []);

        } catch (error) {

            console.error(
                "Error getting students:",
                error
            );
        }
    };


    const activateStudent = async (id) => {

        try {

            await api.put(`/registrar/students/${id}/activate`
            );

            alert("Student activated");

            getStudents();

        } catch (error) {

            console.error(error);
        }
    };


    const deactivateStudent = async (id) => {

        try {

            await api.put(`/registrar/students/${id}/deactivate`);

            alert("Student deactivated");

            getStudents();

        } catch (error) {

            console.error(error);
        }
    };


    return (
        <div>

            <h3 className="h3">Totall Students  :{students.length}</h3>

            <table border={1} className="table">

                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr key={student.student_id} className="key">

                            <td>
                                {student.first_name}{" "}
                                {student.middle_name}{" "}
                                {student.last_name}
                            </td>

                            <td>
                                {student.email}
                            </td>

                            <td>
                                {student.program_name || "No program"}
                            </td>

                            <td>
                                {student.student_status}
                            </td>

                            <td>

                                {student.student_status === "active" ? (

                                    <button className="button"
                                        onClick={() =>
                                            deactivateStudent(
                                                student.student_id
                                            )
                                        }
                                    >
                                        Deactivate
                                    </button>

                                ) : (

                                    <button className="button"
                                        onClick={() =>
                                            activateStudent(
                                                student.student_id
                                            )
                                        }
                                    >
                                        Activate
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Students;