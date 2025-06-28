import classNames from 'classnames/bind';
import styles from './UploadPage.module.scss';
import { useState } from 'react';
import mammoth from 'mammoth';

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

const UploadPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      setError('Vui lòng upload file Word (.docx)');
      setQuiz([]);
      return;
    }

    try {
      setError(null);
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // Parse text to extract questions and answers
      const questions = parseWordContent(text);
      setQuiz(questions);
    } catch (err) {
      setError('Lỗi khi xử lý file Word. Vui lòng thử lại.');
      setQuiz([]);
    }

    // Reset input to allow re-uploading the same file
    event.target.value = '';
  };

  const parseWordContent = (text: string): Question[] => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    const questions: Question[] = [];
    let currentQuestion: Question | null = null;

    lines.forEach((line) => {
      line = line.trim();
      // Match question (e.g., "1. Question text")
      const questionMatch = line.match(/^(\d+)\.\s*(.+)$/);
      if (questionMatch) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          id: parseInt(questionMatch[1]),
          text: questionMatch[2],
          options: [],
        };
        return;
      }

      // Match option (e.g., "A. Option text" or "A. Option text *")
      const optionMatch = line.match(/^([A-D])\.\s*(.+?)(\s*\*?)$/);
      if (optionMatch && currentQuestion) {
        const isCorrect = optionMatch[3].includes('*');
        currentQuestion.options.push({
          label: optionMatch[1],
          text: optionMatch[2].trim(),
          isCorrect,
        });
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  return (
    <div className={cx('container')}>
      <div className={cx('upload-section')}>
        <h1 className={cx('title')}>Upload Bài Kiểm Tra</h1>
        <input
          type="file"
          accept=".docx"
          onChange={handleFileUpload}
          className={cx('file-input')}
          aria-label="Upload file Word"
        />
        {error && <p className={cx('error')}>{error}</p>}
      </div>
        <button className={cx('upload-btn')}>UPLOAD</button>
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