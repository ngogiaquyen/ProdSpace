import classNames from 'classnames/bind';
import styles from './QuestionPage.module.scss';
import { useState, useEffect } from 'react';


const questionsData = [
  {
    "id": 6,
    "question": "Trong cấu hình tệp <strong>web.xml</strong>, thẻ <url-pattern> dùng để:",
    "options": [
      {
        "id": "optionA",
        "label": "A",
        "value": "A",
        "text": "Thiết lập phương thức HTTP được hỗ trợ.",
        "isCorrect": false
      },
      {
        "id": "optionB",
        "label": "B",
        "value": "B",
        "text": "Xác định lớp triển khai Servlet.",
        "isCorrect": false
      },
      {
        "id": "optionC",
        "label": "C",
        "value": "C",
        "text": "Khai báo tên của Servlet.",
        "isCorrect": false
      },
      {
        "id": "optionD",
        "label": "D",
        "value": "D",
        "text": "Định nghĩa đường dẫn URL ánh xạ tới Servlet.",
        "isCorrect": true
      }
    ],
    "isReviewed": false
  },
  {
    "id": 7,
    "question": "Phương thức nào được sử dụng để khởi tạo một Servlet?",
    "options": [
      {
        "id": "optionA7",
        "label": "A",
        "value": "A",
        "text": "doGet()",
        "isCorrect": false
      },
      {
        "id": "optionB7",
        "label": "B",
        "value": "B",
        "text": "init()",
        "isCorrect": true
      },
      {
        "id": "optionC7",
        "label": "C",
        "value": "C",
        "text": "service()",
        "isCorrect": false
      },
      {
        "id": "optionD7",
        "label": "D",
        "value": "D",
        "text": "destroy()",
        "isCorrect": false
      }
    ],
    "isReviewed": false
  }
]

const cx = classNames.bind(styles);

interface Option {
  id: string;
  label: string;
  value: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  isReviewed: boolean;
}

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [reviewChecked, setReviewChecked] = useState<boolean>(false);

  useEffect(() => {
    // Load questions từ JSON
    setQuestions(questionsData);
    // Đặt đáp án mặc định là đáp án đúng của câu hỏi đầu tiên
    const firstQuestion = questionsData[0];
    const correctOption = firstQuestion.options.find((opt) => opt.isCorrect);
    setSelectedOption(correctOption?.value || '');
    setReviewChecked(firstQuestion.isReviewed);
  }, []);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleReviewToggle = () => {
    setReviewChecked(!reviewChecked);
    // Cập nhật trạng thái isReviewed trong dữ liệu nếu cần
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].isReviewed = !reviewChecked;
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = questions[currentQuestionIndex + 1];
      const correctOption = nextQuestion.options.find((opt) => opt.isCorrect);
      setSelectedOption(correctOption?.value || '');
      setReviewChecked(nextQuestion.isReviewed);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('question')}>
          <p className={cx('question-number')}>Câu {currentQuestion.id}:</p>
          <p
            className={cx('question-text')}
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </div>
        <button
          type="button"
          className={cx('review-button')}
          onClick={handleReviewToggle}
        >
          <input
            type="checkbox"
            checked={reviewChecked}
            onChange={handleReviewToggle}
            className={cx('review-checkbox')}
            aria-label="Xem lại câu này"
          />
          Xem lại câu này
        </button>
      </div>

      <form className={cx('options')} aria-label={`Question ${currentQuestion.id} options`}>
        {currentQuestion.options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className={cx('option', { selected: selectedOption === option.value })}
          >
            <span className={cx('option-label')}>{option.label}</span>
            <input
              type="radio"
              id={option.id}
              name={`question${currentQuestion.id}`}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionChange(option.value)}
              className={cx('option-radio')}
            />
            <span
              className={cx('option-text', {
                selected: selectedOption === option.value,
              })}
            >
              {option.text}
            </span>
          </label>
        ))}
      </form>

      <nav className={cx('pagination')} aria-label="Pagination">
        {questions.map((q, index) => (
          <button
            key={q.id}
            type="button"
            className={cx('page-button', {
              active: index === currentQuestionIndex,
              semiActive: index === currentQuestionIndex - 1,
            })}
            aria-label={`Page ${q.id}`}
            aria-current={index === currentQuestionIndex ? 'page' : undefined}
            onClick={() => {
              setCurrentQuestionIndex(index);
              const correctOption = q.options.find((opt) => opt.isCorrect);
              setSelectedOption(correctOption?.value || '');
              setReviewChecked(q.isReviewed);
            }}
          >
            {q.id}
          </button>
        ))}
        <button
          type="button"
          className={cx('next-button')}
          aria-label="Next question"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Câu hỏi tiếp theo
        </button>
      </nav>
    </div>
  );
};

export default QuestionPage;