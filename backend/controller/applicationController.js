const {createService,getMyApplication,submitApplication}=require('../service/applicationService')
const application=async(req,res)=>{
  try {

        const { program_id, academic_year } = req.body;

        const studentId = req.user.student_id;

        if (!program_id || !academic_year) {
            return res.status(400).json({
                message: "Program and academic year are required"
            });
        }

        const result = await createService(studentId,program_id,academic_year);

        res.status(201).json({
            message: "Application created successfully",
            application_id: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create application"
        });
    }
};
const getMyApplicationController = async (req, res) => {

    try {

        const studentId = req.user.student_id;

        const result = await getMyApplication(studentId);

        res.status(200).json({
            applications: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get application"
        });
    }
};


const submitApplicationController = async (req, res) => {

    try {

        const { id } = req.params;

        const studentId = req.user.student_id;

        const result =
            await submitApplication(
                id,
                studentId
            );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Application cannot be submitted"
            });
        }

        res.status(200).json({
            message: "Application submitted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit application"
        });
    }
};
module.exports={application,getMyApplicationController,submitApplicationController}