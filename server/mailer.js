import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // "sohk2828@gmail.com"
      pass: process.env.EMAIL_PASS,  // app password
    },
  });

  const mailOptions = {
    from: `"SyncTask Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
