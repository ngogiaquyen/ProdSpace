const connection = require('~/config/db');
const bcrypt = require('bcrypt');

// Lấy thông tin người dùng theo ID
exports.getCustomer = (callback) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};


// Tạo người dùng mới
exports.createUser = (userData, callback) => {
  const { full_name, email, password, role } = userData;

  // Kiểm tra dữ liệu đầu vào
  if (!full_name || !email || !password || !role) {
    return callback(new Error('Vui lòng cung cấp đầy đủ thông tin: full_name, email, password, role'), null);
  }

  // Kiểm tra email đã tồn tại
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length > 0) {
      return callback(new Error('Email đã tồn tại'), null);
    }

    // Mã hóa mật khẩu
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }

      // Câu lệnh SQL để thêm người dùng mới
      const insertQuery = `
        INSERT INTO users (full_name, email, password, role, created_at, status)
        VALUES (?, ?, ?, ?, NOW(), 'active')
      `;
      const values = [full_name, email, hashedPassword, role];

      connection.query(insertQuery, values, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, {
          id: result.insertId,
          full_name,
          email,
          role,
          status: 'active',
          created_at: new Date()
        });
      });
    });
  });
};
