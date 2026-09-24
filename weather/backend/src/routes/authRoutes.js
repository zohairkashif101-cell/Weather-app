const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

module.exports = router;





