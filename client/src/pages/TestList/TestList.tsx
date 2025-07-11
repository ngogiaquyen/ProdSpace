import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './TestList.module.scss';
import { routes } from '~/config';
import { getData } from '~/service/apiService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

interface Tests {
    test_id:    number;
    subject_id: number;
    name:       string;
    status:     string;
    created_at: Date;
    updated_at: Date;
}


const TestList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject_id');
  const [tests, setTests] = useState<Tests[]>([]);


  const handleLoadData = async () => {
    const newList = await getData(`/subjects/${subjectId}/tests`);
    if(newList && newList.data){
      setTests(newList);
      console.log(newList.data)
    }
  }

  useEffect(() => {
    handleLoadData();
  }, [])

  const handleTestClick = (testId: number) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className={cx('test-list-container')}>
      <h2 className={cx('title')}>Danh sách bài kiểm tra</h2>
      <div className={cx('test-list')}>
        {tests.map((test, index) => (
          <NavLink
            key={test.test_id}
            to={routes.test}
            className={cx('test-item')}
            onClick={() => handleTestClick(test.test_id)}
          >
            <span className={cx('test-number')}>{index + 1}</span>
            <span className={cx('test-title')}>{test.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TestList;