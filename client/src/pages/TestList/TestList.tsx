import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './TestList.module.scss';
import { routes } from '~/config';

const cx = classNames.bind(styles);

interface Test {
  id: string;
  title: string;
}

const TESTS: Test[] = [
  {
    id: '1', // Sửa id thành string để khớp với interface
    title: 'Bài kiểm tra 1',
  },
  {
    id: '1', // Sửa id thành string để khớp với interface
    title: 'Bài kiểm tra 1',
  },
  {
    id: '1', // Sửa id thành string để khớp với interface
    title: 'Bài kiểm tra 1',
  },
  {
    id: '1', // Sửa id thành string để khớp với interface
    title: 'Bài kiểm tra 1',
  },
];

const TestList: React.FC = () => {
  const navigate = useNavigate();

  const handleTestClick = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className={cx('test-list-container')}>
      <h2 className={cx('title')}>Danh sách bài kiểm tra</h2>
      <div className={cx('test-list')}>
        {TESTS.map((test, index) => (
          <NavLink
            key={test.id}
            to={routes.test}
            className={cx('test-item')}
            onClick={() => handleTestClick(test.id)}
          >
            <span className={cx('test-number')}>{index + 1}</span>
            <span className={cx('test-title')}>{test.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TestList;