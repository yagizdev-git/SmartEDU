const nodemailer = require('nodemailer');
require('dotenv').config();

exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    pageName: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};

exports.getCoursesPage = (req, res) => {
  res.status(200).render('courses', {
    pageName: 'courses',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};

exports.sendMail = async (req, res) => {
  let outputMessage = `
  
  <h1>From:</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>E-Mail: ${req.body.email}</li>
  </ul>

  <br><br>
  
  <h1>Message</h1>
  <p>${req.body.message}</p>
  
  `;

  // SMTP transporter kurulumunu yap
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.mail, // Mail adresi
      pass: process.env.pass, // Mail adresi şifresi
    },
  });

  // Gönderilecek e-posta bilgileri
  const mailOptions = {
    from: `"SmartEDU Contact Form" <${process.env.mail}>`, // Gönderen adresi
    to: 'endback0707@gmail.com', // Alıcı adresi
    subject: 'SmartEDU Contact Form',
    html: outputMessage,
  };

  // E-postayı gönder
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Mesaj gönderildi: %s', info.messageId);
  });

  req.flash('success', 'Mail başarıyla gönderildi!');
  res.status(200).redirect('contact');
};
