const nodemailer = require('nodemailer');

// Tạo transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ngogiaquyendhtn223@gmail.com",      // thay bằng email của bạn
    pass: "rbuqoqdkledegael"          // thay bằng app password (không dùng mật khẩu tài khoản Gmail)
  }
});

// Hàm gửi email
function sendNotificationEmail(htmlContent) {
  const mailOptions = {
    from: 'website blog',
    to: 'dtc225180268@ictu.edu.vn',
    subject: 'Thông báo: Tin nhắn mới',
    html: htmlContent
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Lỗi gửi mail:', error);
    } else {
      console.log('Đã gửi mail:', info.response);
    }
  });
}

module.exports = sendNotificationEmail;