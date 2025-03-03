const express = require('express');
const { getRSVPSummary, getGuestReport } = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/summary/:weddingId', authMiddleware, getRSVPSummary);
router.get('/report/:weddingId', authMiddleware, getGuestReport);

module.exports = router;