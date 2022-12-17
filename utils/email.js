const nodemailer = require("nodemailer");
//const { options } = require("../routes/auth");

const sendEmail = async (options) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define email options
  const mailOptions = {
    from: "Mehmet Soysal <mehmet@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };
  // Actually send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
