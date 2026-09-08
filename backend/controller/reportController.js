const {getRegistrarReportService,getDeanReportService} = require('../service/reportService');

const getRegistrarReport = async (req, res) => {
    try {
        const report = await getRegistrarReportService();

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('Error loading registrar report:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to load registrar report'
        });
    }
};
// ===============================
// DEAN REPORT
// ===============================

const getDeanReport = async (req, res) => {
    try {
        const report = await getDeanReportService();

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('Error loading dean report:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to load dean report'
        });
    }
};
module.exports = {
    getRegistrarReport,
    getDeanReport
};