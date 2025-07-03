import classNames from 'classnames/bind';
import styles from './LmsPage.module.scss';

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
      <main className={cx('main')}>
        <header className={cx('header')}>BẢNG TIN ICTU</header>
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
  );
};

export default LmsPage;
