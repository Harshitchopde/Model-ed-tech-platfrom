const Razorpay = require("razorpay")

exports.instance = new Razorpay({
    key_id:process.env.RAZORKEY_ID,
    key_secret:process.env.RAZORKEY_SECRET,
})