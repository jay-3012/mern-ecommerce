const express = require('express');
const paymentController = require('../controllers/Payment');
const router = express.Router();

router.post('/create-order', paymentController.createRazorpayOrder);
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;
