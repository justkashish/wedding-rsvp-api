const express = require('express');
const {
    addGuest,
    getGuestList,
    updateRSVP,
    deleteGuest,
    getGuestQR
} = require('../controllers/guestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addGuest);
router.get('/:weddingId', authMiddleware, getGuestList);
router.put('/:guestId', authMiddleware, updateRSVP);
router.delete('/:guestId', authMiddleware, deleteGuest);
router.get('/qr/:guestId', authMiddleware, getGuestQR);

module.exports = router;