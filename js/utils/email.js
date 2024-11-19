import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with actual SMTP server
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@example.com', // Replace with actual email
        pass: 'your-password' // Replace with actual password
    }
});

export async function sendEmail({ to, subject, text, html }) {
    try {
        await transporter.sendMail({
            from: '"School Management System" <noreply@school.com>',
            to,
            subject,
            text,
            html
        });
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}