const express = require('express');

const router = express.Router();

const {
    getDashboard
} = require("../controller/deanController");

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('dean'),
    getDashboard
);


module.exports = router;