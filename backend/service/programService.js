const db=require('../db/dbConfig')
const programService=async()=>{
    const [result] = await db.query(
        "SELECT program_id, program_name, description FROM programs WHERE is_active = TRUE"
    );

    return result;
};

module.exports={programService}