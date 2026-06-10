import nodemailer from 'nodemailer';

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this if you don't use Gmail
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your App Password
    }
});

// The API function that Vercel will run
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Only POST allowed' });
    }

    try {
        // Grab the data from your React form
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Send an email notification
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email credentials are not configured');
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send email to yourself
            replyTo: email, // If you hit reply, it replies to the user
            subject: `New Portfolio Message from ${name}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
            html: `<h3>New Portfolio Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Failed to send message:', error);
        return res.status(500).json({ success: false, error: 'Failed to send message' });
    }
}