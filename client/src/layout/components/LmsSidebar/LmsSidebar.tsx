import classNames from 'classnames/bind';
import styles from './LmsSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faCalendarAlt,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { routes } from '~/config';
import { useEffect, useState } from 'react';
import { getData } from '~/service/apiService';
import { NavLink } from 'react-router-dom';

interface SubjectInfo {
  subject_id: number,
  name: string,
  description: String,
}

const cx = classNames.bind(styles);


const Sidebar: React.FC = () => {

  const [subjectInfo, setSubjectInfo] = useState<SubjectInfo[]>([]);;

  const handleLoadData = async () => {
    const subjects = await getData("/subjects");
    if (subjects) {
      setSubjectInfo(subjects);
    }
  }

  useEffect(() => {
    handleLoadData();
  }, [])

  return (
    <aside className={cx('sidebar')}>
      <div className={cx('sidebar-header')}>
        <div className={cx('logo-container')}>
          <img
            src="https://storage.googleapis.com/a1aa/image/4be58fdc-7694-4510-5980-a6cb034b9005.jpg"
            alt="LMS for students logo"
            className={cx('logo')}
          />
          <div className={cx('logo-info')}>
            <span className={cx('version')}>V3.2.25</span>
            <span className={cx('url')}>lms.ictu.edu.vn</span>
          </div>
        </div>
        <div className={cx('user-profile')}>
          <img
            src="https://storage.googleapis.com/a1aa/image/87889d94-6b62-4354-46a0-019d2165d9fc.jpg"
            alt="User avatar"
            className={cx('avatar')}
          />
          <div className={cx('user-info')}>
            <p className={cx('user-name')}>Nguyen Van A</p>
            <p className={cx('user-id')}>DTC.........</p>
          </div>
          <FontAwesomeIcon icon={faFilter} className={cx('filter-icon')} />
        </div>
      </div>

      <nav className={cx('sidebar-nav')}>
        <a href={routes.lms} className={cx('nav-item', 'active')}>
          <FontAwesomeIcon icon={faChartLine} className={cx('nav-icon')} />
          <span>Bảng tin LMS</span>
        </a>
      </nav>

      <div className={cx('sidebar-section')}>
        <p className={cx('section-title')}>Học tập</p>
        {
          subjectInfo.map((subject) => (
            <NavLink key={subject.subject_id} to={`${routes.list}?subject_id=${subject.subject_id}`} className={cx('nav-item', 'disabled')}>
              <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
              <span>{subject.name}</span>
            </NavLink>
          ))
        }
      </div>

      <div className={cx('sidebar-section')}>
        <p className={cx('section-title')}>Other</p>
        <NavLink to={routes.upload} className={cx('nav-item', 'disabled')}>
          <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
          <span>Tải lên</span>
        </NavLink>
        <NavLink to={routes.testManagement} className={cx('nav-item', 'disabled')}>
          <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
          <span>Quản lý</span>
        </NavLink>
        <NavLink to={routes.login} className={cx('nav-item', 'disabled')}>
          <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
          <span>Đăng nhập</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
