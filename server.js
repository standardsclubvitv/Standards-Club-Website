require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log(`📨 Processing message from ${name} <${email}>...`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_TO,
        subject: subject,
        text: `New message from ${name} <${email}>:\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        res.status(200).json({
            message: 'Message sent successfully!',
            status: 'success'
        });
    } catch (error) {
        console.error('❌ Failed to send email:', error);
        res.status(500).json({
            message: 'Failed to send message.',
            status: 'error'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
