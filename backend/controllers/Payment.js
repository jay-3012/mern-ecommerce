const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
// Wait for user to add keys in environment
let razorpayInstance;
try {
    razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
} catch (err) {
    console.log("Razorpay initialization failed:", err);
}

exports.createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        // Amount is in INR/cents depending on currency. Assuming INR for Razorpay standard.
        // We will receive amount in USD/etc. from frontend and convert to smallest unit if needed.
        // For Razorpay, amount is in paise (amount * 100) if INR
        const options = {
            amount: Math.round(amount * 100), // convert to smallest unit
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.status(500).send("Some error occurred");
        }

        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
