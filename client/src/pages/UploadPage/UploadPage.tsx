import classNames from 'classnames/bind';
import styles from './UploadPage.module.scss';
import { useEffect, useState } from 'react';
import { getData, postData } from '~/service/apiService';

const cx = classNames.bind(styles);

interface Option {
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Subject {
  subject_id: number;
  name: string;
}

interface Test {
  test_id: number;
  name: string;
}

interface UploadPayload {
  subject_id: number;
  test_id: number;
  questions: {
    text: string;
    options: {
      label: string;
      text: string;
      is_correct: boolean;
    }[];
  }[];
}

const UploadPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadSubject = async () => {
    try {
      const subjectRes = await getData('/subjects');
      setSubjects(subjectRes || []);
    } catch (err) {
      setError('Không thể tải danh sách môn học');
    }
  };

  const handleLoadTest = async () => {
    if (!selectedSubject) {
      setTests([]);
      setSelectedTest(null);
      return;
    }
    try {
      const testRes = await getData(`/subjects/${selectedSubject}/tests`);
      const fetchedTests = testRes.data || [];
      setTests(fetchedTests);
      // Tự động chọn bài kiểm tra đầu tiên nếu có
      if (fetchedTests.length > 0) {
        setSelectedTest(fetchedTests[0].test_id);
      } else {
        setSelectedTest(null);
      }
    } catch (err) {
      setError('Không thể tải danh sách bài kiểm tra');
      setSelectedTest(null);
    }
  };

  useEffect(() => {
    handleLoadSubject();
  }, []);

  useEffect(() => {
    handleLoadTest();
  }, [selectedSubject]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError('Vui lòng upload file JSON (.json)');
      setQuiz([]);
      return;
    }

    if (!selectedSubject || !selectedTest) {
      setError('Vui lòng chọn môn học và bài kiểm tra');
      setQuiz([]);
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const questions = parseJsonContent(jsonData);
      setQuiz(questions);
    } catch (err) {
      setError('Lỗi khi xử lý file JSON. Vui lòng kiểm tra định dạng file.');
      setQuiz([]);
    }

    event.target.value = '';
  };

  const parseJsonContent = (jsonData: any[]): Question[] => {
    const questions: Question[] = [];

    jsonData.forEach((item, index) => {
      if (!item.text || !Array.isArray(item.options)) {
        throw new Error('Định dạng JSON không hợp lệ: Thiếu trường text hoặc options không phải mảng');
      }

      const question: Question = {
        id: index + 1, // Sử dụng index + 1 làm id (vì JSON không có trường id)
        text: item.text,
        options: item.options.map((opt: any) => ({
          label: opt.label,
          text: opt.text,
          isCorrect: opt.is_correct,
        })),
      };

      questions.push(question);
    });

    return questions;
  };

  const handleUpload = async () => {
    if (!selectedSubject || !selectedTest || quiz.length === 0) {
      setError('Vui lòng chọn môn học, bài kiểm tra và tải lên file JSON');
      return;
    }

    const payload: UploadPayload = {
      subject_id: selectedSubject,
      test_id: selectedTest,
      questions: quiz.map((q) => ({
        text: q.text,
        options: q.options.map((opt) => ({
          label: opt.label,
          text: opt.text,
          is_correct: opt.isCorrect,
        })),
      })),
    };

    const formData = new FormData();
    formData.append('subject_id', payload.subject_id.toString());
    formData.append('test_id', payload.test_id.toString());
    formData.append('questions', JSON.stringify(payload.questions));

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await postData(`/subjects/${selectedSubject}/tests/${selectedTest}/questions/bulk`, formData);
      setSuccess('Tải lên câu hỏi thành công!');
      setQuiz([]); // Reset quiz sau khi tải lên
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải lên câu hỏi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('upload-section')}>
        <h1 className={cx('title')}>Upload Bài Kiểm Tra</h1>
        <select
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(Number(e.target.value) || null)}
          className={cx('file-input')}
          aria-label="Chọn môn học"
        >
          <option value="" disabled>
            Chọn môn học
          </option>
          {subjects.map((subject) => (
            <option key={subject.subject_id} value={subject.subject_id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          value={selectedTest || ''}
          onChange={(e) => setSelectedTest(Number(e.target.value) || null)}
          className={cx('file-input')}
          aria-label="Chọn bài kiểm tra"
          disabled={!selectedSubject || tests.length === 0}
        >
          <option value="" disabled>
            Chọn bài kiểm tra
          </option>
          {tests.map((test) => (
            <option key={test.test_id} value={test.test_id}>
              {test.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className={cx('file-input')}
          aria-label="Upload file JSON"
        />
        <button
          className={cx('upload-btn')}
          onClick={handleUpload}
          disabled={loading || quiz.length === 0 || !selectedTest}
        >
          {loading ? 'Đang tải lên...' : 'UPLOAD'}
        </button>
        {error && <p className={cx('error')}>{error}</p>}
        {success && <p className={cx('success')}>{success}</p>}
      </div>
      {quiz.length > 0 && (
        <div className={cx('quiz-section')}>
          <h2 className={cx('quiz-title')}>Danh Sách Câu Hỏi</h2>
          {quiz.map((question) => (
            <div key={question.id} className={cx('question')}>
              <p className={cx('question-text')}>
                Câu {question.id}: {question.text}
              </p>
              <ul className={cx('options')}>
                {question.options.map((option, index) => (
                  <li
                    key={index}
                    className={cx('option', { correct: option.isCorrect })}
                  >
                    {option.label}. {option.text}
                    {option.isCorrect && <span className={cx('correct-mark')}> (Đúng)</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPage;