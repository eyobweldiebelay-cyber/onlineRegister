const deanService = require('../service/deanDshService');

const getDashboard = async (req, res) => {
    try {

        const dashboard = await deanService.getDashboard();

        res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error) {

        console.error(
            'Error loading Dean dashboard:',
            error
        );

        res.status(500).json({
            success: false,
            message: 'Failed to load Dean dashboard'
        });
    }
};


module.exports = {
    getDashboard
};