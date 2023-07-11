const Razorpay = require('razorpay');
const User = require('../model/userSchema')
const crypto = require('crypto')
require('dotenv').config();


// userCreatePayment
exports.userCreatePayment = async (req, res) => {

    const razorpay = new Razorpay({
        key_id: 'rzp_test_RvU9CuKT2BsDrz',
        key_secret: 'F37rnpOlGKDpsg512ZtjnBWt',
    });
    const {order_id,amount,userid } = req.body;

    const options = {
        amount: amount * 100, // The payment amount in paise (e.g., Rs. 10.00)
        currency:'INR',
        receipt: order_id,
        payment_capture: 1,
        
        // notes: {
        //     name,
        //     email,
        // },
    };


    try {
        const order = await razorpay.orders.create(options);
        if(order){
            res.status(200).json({
                message:"Order Created", data:order
            })
        }else{
            res.status(500).json({message:"Something Went wrong"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create order');
    }

    // Handle payment success callback
  
}

// verifyPayment
exports.verifyPayment = async (req, res) => {
    // const { order_id, payment_id, signature } = req.body;

    // // Verify the payment signature
    // const generatedSignature = calculateSignature(order_id, payment_id);
    // if (generatedSignature === signature) {
    //   // Payment signature is valid
    //   // Handle the payment success logic
    //   res.send('Payment success');
    // } else {
    //   // Invalid payment signature
    //   res.status(400).send('Invalid payment signature');
    // }
  
    // function calculateSignature(orderId, paymentId) {
    //     // Implement your own signature generation logic
    //     // Here's an example using the 'crypto' module
    //     const secret = 'YOUR_RAZORPAY_KEY_SECRET';
    //     const data = orderId + '|' + paymentId;
    //     const hmac = crypto.createHmac('sha256', secret);
    //     hmac.update(data);
    //     return hmac.digest('hex');
    //   }

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256','F37rnpOlGKDpsg512ZtjnBWt')
    .update(body.toString())
    .digest('hex');

    const response = {"signatureIsValid":'false'}
    if(expectedSignature === req.body.response.razorpay_signature) 
    {
        res.send({code:200 , message:"Payment Successfull"});

    }else{
        res.send({code:500, message:"Payment failed"})
    }
    // response = {"signatureIsValid":"true"}
    
}

//userAddingWalletCreatePayment
exports.userAddingWalletCreatePayment = async(req,res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_RvU9CuKT2BsDrz',
        key_secret: 'F37rnpOlGKDpsg512ZtjnBWt',
    });
    const {order_id,amount,userid } = req.body;

    const options = {
        amount: amount * 100, // The payment amount in paise (e.g., Rs. 10.00)
        currency:'INR',
        receipt: order_id,
        payment_capture: 1,
        
    };


    try {
        const order = await razorpay.orders.create(options);
        if(order){
            res.status(200).json({
                message:"Order Created", data:order
            })
        }else{
            res.status(500).json({message:"Something Went wrong"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create order');
    }
}

// userAddingWalletVerifyPayment
exports.userAddingWalletVerifyPayment = async(req,res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256','F37rnpOlGKDpsg512ZtjnBWt')
    .update(body.toString())
    .digest('hex');

    const response = {"signatureIsValid":'false'}
    if(expectedSignature === req.body.response.razorpay_signature) 
    {
        res.send({code:200 , message:"Payment Successfull"});

    }else{
        res.send({code:500, message:"Payment failed"})
    }
}