import crypto from "crypto";
import razorpayClient from "../utils/razorpayClient.js";
import Booking from "../models/Booking.js";





// ✅ Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const amount = booking.totalAmount || booking.amount || booking.price;
    if (!amount) return res.status(400).json({ message: "Booking amount missing" });

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_${bookingId}`,
      payment_capture: 1,
    };

    const order = await razorpayClient.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// ✅ Verify Payment (for both localhost + production)
export const verifyPayment = async (req, res) => {
  try {
  console.log('API Base URL:', process.env.REACT_APP_API_URL);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // NOTE: This signature verification step is correct.
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      
        // We must fetch the booking first to get the totalAmount for paymentResult
        const bookingToUpdate = await Booking.findOne({ razorpayOrderId: razorpay_order_id });

        if (!bookingToUpdate) return res.status(404).json({ message: "Booking not found" });


        // ⭐ FIX: Use the existing document and update fields, including paymentResult
        bookingToUpdate.isPaid = true;
        bookingToUpdate.status = "Confirmed";
        bookingToUpdate.paymentResult = {
            id: razorpay_payment_id,
            status: 'Captured', // The payment has been captured
            amount: bookingToUpdate.totalAmount,
            currency: 'INR',
            updated_at: new Date(),
        };

        const updatedBooking = await bookingToUpdate.save();
        
        // If you were using findOneAndUpdate, here's the better version:
        /*
        const updatedBooking = await Booking.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                isPaid: true,
                status: "Confirmed",
                // paymentId: razorpay_payment_id, // Removed: use paymentResult instead
                paymentResult: { 
                    id: razorpay_payment_id, 
                    status: 'Captured',
                    // Assuming you can't access totalAmount here easily, 
                    // you might need to rely on the data saved in createOrder 
                }, 
            },
            { new: true }
        );
        */

      res.json({ success: true, message: "Payment verified successfully", booking: updatedBooking });
    } else {
      res.status(400).json({ success: false, message: "Invalid Razorpay signature" });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

// ✅ Optional Razorpay Webhook (for Render/Vercel)
export const handleRazorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body.event;
    if (event === "payment.captured") {
      const orderId = req.body.payload.payment.entity.order_id;
      await Booking.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { isPaid: true, status: "Confirmed" }
      );
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};


// Create Razorpay Order
