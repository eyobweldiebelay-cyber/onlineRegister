const express = require('express');

const router = express.Router();

const {
    getRegistrarReport,getDeanReport
} = require('../controller/reportController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get(
    '/registrar',
    authMiddleware,
    roleMiddleware('registrar'),
    getRegistrarReport
);
// ===============================
// DEAN REPORT
// ===============================

router.get(

    '/dean',

    authMiddleware,

    roleMiddleware('dean'),

    getDeanReport

);

module.exports = router;