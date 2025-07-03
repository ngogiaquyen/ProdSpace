const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '103.97.126.29', // Địa chỉ host MySQL
  user: process.env.DB_USER || 'ukeptbsx_exam_management', // Tên người dùng MySQL
  database: process.env.DB_NAME || 'ukeptbsx_exam_management', // Tên cơ sở dữ liệu
  password: process.env.DB_PASSWORD || 'HLYBD7RyeDvMWRk8KRcM', // Mật khẩu MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL:', err.stack);
    return;
  }
  console.log('Kết nối thành công tới MySQL với ID kết nối:', connection.threadId);
});

module.exports = connection;
