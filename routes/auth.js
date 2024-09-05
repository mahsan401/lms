const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Adjust the path as necessary

const router = express.Router();

// JWT secret key (in a real application, store this in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/login - User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
        // Find the user by email
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = user.validPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role_id: user.role_id,branch_id: user.branch_id }, JWT_SECRET, {
            expiresIn: '3h' // Token expires in 3 hour
        });

        // Return the token
        res.json({ token });
    } catch (error) {
        console.log(error,JWT_SECRET)
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

//POST /api/request-reset-password
router.post('/request-reset-password',async (req,res)=>{
    const {email,base_url}=req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });

        // Send reset token via email
        // Note: Set up your SMTP server credentials
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_POST,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please use the following token to reset your password: ${base_url}?token=${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset token sent to your email' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while requesting a password reset' });
    }

});

//POST /api/reset-password
router.post('/reset-password',async (req,res)=>{
    const { token, new_password } = req.body;
    console.log(token)

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user by ID from the decoded token
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Invalid token or user not found' });
        }

        // Update the user's password
        user.password = new_password;
        await user.save();
        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
})
module.exports = router;
