import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface GoogleUser {
  name: string;
  email: string;
}

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hàm giả lập đăng nhập
  const handleMockLogin = () => {
    if (!user) {
      // Mô phỏng đăng nhập thành công với dữ liệu mẫu
      setUser({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
      });
      setError(null);
    } else {
      // Mô phỏng đăng xuất
      setUser(null);
      setError(null);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('login-section')}>
        <h1 className={cx('title')}>Đăng Nhập</h1>
        <button
          className={cx('google-signin-button')}
          onClick={handleMockLogin}
        >
          <span className={cx('google-logo')}></span>
          {user ? 'Đăng Xuất' : 'Đăng Nhập bằng Google'}
        </button>
        {user && (
          <div className={cx('user-info')}>
            <p className={cx('user-name')}>Chào mừng, {user.name}!</p>
            <p className={cx('user-email')}>{user.email}</p>
          </div>
        )}
        {error && <p className={cx('error')}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;