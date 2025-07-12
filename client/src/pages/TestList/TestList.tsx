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
    console.log(subjectId)
    const newList = await getData(`/subjects/${subjectId}/tests`);
    if(newList && newList.data){
      setTests(newList.data);
      console.log(newList.data)
    }
  }

  useEffect(() => {
    handleLoadData();
  }, [subjectId])


  if(!tests) return <div>Đang tải</div>
  if(tests.length === 0) return <div>Không tìm thấy bài học</div>

  return (
    <div className={cx('test-list-container')}>
      <h2 className={cx('title')}>Danh sách bài kiểm tra</h2>
      <div className={cx('test-list')}>
        {tests.map((test, index) => (
          <NavLink
            key={test.test_id}
            to={`${routes.test}?subject_id=${subjectId}&test_id=${test.test_id}`}
            className={cx('test-item')}
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