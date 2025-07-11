import classNames from 'classnames/bind';
import styles from './UploadPage.module.scss';
import { useState } from 'react';

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
  id: number;
  name: string;
}

// Dữ liệu môn học tĩnh (giả lập từ bảng subjects)
const mockSubjects: Subject[] = [
  { id: 1, name: 'Môn Abc' },
  { id: 2, name: 'Môn Xyz' },
];

const UploadPage: React.FC = () => {
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [testName, setTestName] = useState<string>('');
  const [testStatus, setTestStatus] = useState<'Active' | 'Draft'>('Draft');
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError('Vui lòng upload file JSON (.json)');
      setQuiz([]);
      return;
    }

    if (!selectedSubject || !testName) {
      setError('Vui lòng chọn môn học và nhập tên bài kiểm tra.');
      setQuiz([]);
      return;
    }

    try {
      setError(null);
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const questions = parseJsonContent(jsonData);
      setQuiz(questions);
    } catch (err) {
      setError('Lỗi khi xử lý file JSON. Vui lòng kiểm tra định dạng file.');
      setQuiz([]);
    }

    // Reset input file
    event.target.value = '';
  };

  const parseJsonContent = (jsonData: any[]): Question[] => {
    const questions: Question[] = [];

    jsonData.forEach((item) => {
      const question: Question = {
        id: item.id,
        text: item.question,
        options: [],
      };

      // Xử lý options
      if (typeof item.options === 'object' && !Array.isArray(item.options)) {
        // Trường hợp options là object
        Object.entries(item.options).forEach(([label, text]) => {
          let isCorrect = false;

          if (typeof item.answer === 'string') {
            // Trường hợp answer là string (câu trả lời đơn, như câu 1, 2, 4, 5, 6, 9, 10, 11, 12, 13)
            isCorrect = item.answer === label;
          } else if (Array.isArray(item.answer)) {
            // Trường hợp answer là mảng (nhiều lựa chọn đúng, như câu 3, 7)
            isCorrect = item.answer.includes(label);
          } else if (typeof item.answer === 'object') {
            // Trường hợp answer là object (như câu 8, với Đúng/Sai)
            isCorrect = item.answer[label] === 'Đúng';
          }

          question.options.push({
            label,
            text: text as string,
            isCorrect,
          });
        });
      } else if (Array.isArray(item.options)) {
        // Trường hợp options là mảng (như câu 14)
        item.options.forEach((opt: any) => {
          Object.entries(opt).forEach(([key, values]) => {
            (values as string[]).forEach((text) => {
              question.options.push({
                label: key,
                text,
                isCorrect: item.answer[text] === key,
              });
            });
          });
        });
      }

      questions.push(question);
    });

    return questions;
  };

  return (
    <div className={cx('container')}>
      <div className={cx('upload-section')}>
        <h1 className={cx('title')}>Upload Bài Kiểm Tra</h1>
        <select
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(Number(e.target.value))}
          className={cx('file-input')}
          aria-label="Chọn môn học"
        >
          <option value="" disabled>
            Chọn môn học
          </option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tên bài kiểm tra"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className={cx('file-input')}
          aria-label="Nhập tên bài kiểm tra"
        />
        <select
          value={testStatus}
          onChange={(e) => setTestStatus(e.target.value as 'Active' | 'Draft')}
          className={cx('file-input')}
          aria-label="Chọn trạng thái"
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
        </select>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className={cx('file-input')}
          aria-label="Upload file JSON"
        />
        <button className={cx('upload-btn')} onClick={() => {}}>
          UPLOAD
        </button>
        {error && <p className={cx('error')}>{error}</p>}
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