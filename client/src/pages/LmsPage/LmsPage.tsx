import classNames from 'classnames/bind';
import styles from './LmsPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faCalendarAlt, 
  faBookOpen, 
  faFlag, 
  faClipboardCheck, 
  faCommentAlt, 
  faQuoteLeft, 
  faChartArea,
  faFilter 
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface Course {
  id: number;
  name: string;
  code: string;
  weeks: string;
  absences: number;
  status: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: 'Kiểm thử và đảm bảo chất lượng phần mềm-2-24',
    code: 'K21A.KTPM.D1.K2.N01',
    weeks: '9/9',
    absences: 0,
    status: 'Đúng tiến độ',
  },
  // ... other courses (similarly structured)
];

const LmsPage: React.FC = () => {
  return (
    <div className={cx('container')}>
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
              <p className={cx('user-name')}>Ngô Gia Quyền</p>
              <p className={cx('user-id')}>DTC225180268</p>
            </div>
            <FontAwesomeIcon icon={faFilter} className={cx('filter-icon')} />
          </div>
        </div>
        <nav className={cx('sidebar-nav')}>
          <a href="#" className={cx('nav-item', 'active')}>
            <FontAwesomeIcon icon={faChartLine} className={cx('nav-icon')} />
            <span>Bảng tin LMS</span>
          </a>
        </nav>
        <div className={cx('sidebar-section')}>
          <p className={cx('section-title')}>Học tập</p>
          <a href="#" className={cx('nav-item', 'disabled')}>
            <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
            <span>Thời khóa biểu</span>
          </a>
          <a href="#" className={cx('nav-item', 'disabled')}>
            <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
            <span>Thời khóa biểu</span>
          </a>
          <a href="#" className={cx('nav-item', 'disabled')}>
            <FontAwesomeIcon icon={faCalendarAlt} className={cx('nav-icon')} />
            <span>Thời khóa biểu</span>
          </a>
          {/* ... other nav items */}
        </div>
        <div className={cx('sidebar-section')}>
          <p className={cx('section-title')}>Kết quả</p>
        </div>
      </aside>
      <main className={cx('main')}>
        <header className={cx('header')}>
          BẢNG TIN ICTU
        </header>
        <section className={cx('content')}>
          <div className={cx('courses-header')}>
            Các lớp học phần học kỳ hiện tại (2024_2025_2)
          </div>
          <div className={cx('courses-table')}>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên lớp học phần</th>
                  <th>Tuần học</th>
                  <th>Số buổi nghỉ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>
                      {course.name}
                      <br />
                      ({course.code})
                    </td>
                    <td>{course.weeks}</td>
                    <td>{course.absences}</td>
                    <td>{course.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LmsPage;