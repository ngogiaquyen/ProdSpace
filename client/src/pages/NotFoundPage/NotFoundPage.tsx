import classNames from 'classnames/bind';
import styles from './NotFoundPage.module.scss';
import { NavLink } from 'react-router-dom';
import { routes } from '~/config';

const cx = classNames.bind(styles);

function NotFoundPage () {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>404</h1>
      <h2 className={cx('subtitle')}>
        Không tìm thấy nội dung <span role="img" aria-label="sad">😓</span>
      </h2>
      <p className={cx('description')}>
        URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
      </p>
      <p className={cx('description')}>
        Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.
      </p>
      <NavLink to={routes.home} className={cx('button')}>VỀ TRANG CHỦ</NavLink>
      <footer className={cx('footer')}>
        © 2025 ngogiaquyen.io.vn
      </footer>
    </div>
  );
};

export default NotFoundPage;
