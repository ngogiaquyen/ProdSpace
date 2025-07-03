my-api/
│
├── src/                       # Mọi source code nằm trong src
│   ├── config/                # Cấu hình: DB, env, middleware...
│   │   ├── db.js
│   │   └── logger.js
│   │
│   ├── modules/               # Các modules chính (chia theo domain)
│   │   └── user/              # Module User (tương tự cho product, order, auth...)
│   │       ├── controllers/   # Controllers xử lý request
│   │       │   └── user.controller.js
│   │       ├── services/      # Business logic
│   │       │   └── user.service.js
│   │       ├── models/        # Mongoose schema hoặc ORM model
│   │       │   └── user.model.js
│   │       ├── routes/        # Định nghĩa routes
│   │       │   └── user.route.js
│   │       └── validators/    # Joi, Yup, Zod... để validate đầu vào
│   │           └── user.validator.js
│   │
│   ├── middleware/            # Tùy chỉnh middleware (auth, error handler,...)
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── utils/                 # Hàm tiện ích dùng chung (hash, JWT, email,...)
│   │   ├── jwt.js
│   │   └── hash.js
│   │
│   ├── app.js                 # Khởi tạo Express app, middleware, routes
│   └── server.js              # Entry point khởi chạy server
│
├── tests/                     # Thư mục test (unit, integration)
│
├── .env                       # Biến môi trường
├── .gitignore
├── package.json
└── README.md



///

/api/users/register

{
  "name": "No Ja Wenn",
  "email": "ja@example.com",
  "password": "123456"
}
