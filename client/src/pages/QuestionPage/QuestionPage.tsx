import classNames from 'classnames/bind';
import styles from './QuestionPage.module.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getData } from '~/service/apiService';

const cx = classNames.bind(styles);

interface Option {
  option_id: number;
  question_id: number;
  label: string;
  text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

interface Question {
  question_id: number;
  test_id: number;
  text: string;
  options: Option[];
  created_at: string;
  updated_at: string;
  isReviewed?: boolean; // Thêm trường isReviewed để theo dõi trạng thái xem lại
}

interface QuizData {
  test_id: number;
  test_name: string;
  subject_id: number;
  subject_name: string;
  questions: Question[];
}

const QuestionPage: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [reviewChecked, setReviewChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const subject_id = searchParams.get('subject_id');
  const test_id = searchParams.get('test_id');

  const handleLoadData = async () => {
    if (!subject_id || !test_id) {
      setError('Thiếu subject_id hoặc test_id');
      setLoading(false);
      return;
    }

    try {
      const data = await getData(`/subjects/${subject_id}/tests/${test_id}/questions`);
      // Thêm trường isReviewed mặc định là false cho mỗi câu hỏi
      const questionsWithReview = data.questions.map((question: Question) => ({
        ...question,
        isReviewed: false,
      }));
      setQuizData({ ...data, questions: questionsWithReview });
      setLoading(false);
      // Đặt đáp án mặc định cho câu hỏi đầu tiên
      if (data.questions.length > 0) {
        const firstQuestion = data.questions[0];
        const correctOption = firstQuestion.options.find((opt: Option) => opt.is_correct);
        setSelectedOption(correctOption?.label || '');
        setReviewChecked(firstQuestion.isReviewed || false);
      }
    } catch (err) {
      setError('Không thể tải dữ liệu câu hỏi');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, [subject_id, test_id]);

  const handleOptionChange = (label: string) => {
    setSelectedOption(label);
  };

  const handleReviewToggle = () => {
    setReviewChecked(!reviewChecked);
    if (quizData) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[currentQuestionIndex].isReviewed = !reviewChecked;
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const handleNextQuestion = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = quizData.questions[currentQuestionIndex + 1];
      const correctOption = nextQuestion.options.find((opt: Option) => opt.is_correct);
      setSelectedOption(correctOption?.label || '');
      setReviewChecked(nextQuestion.isReviewed || false);
    }
  };

  if (loading) {
    return <div className={cx('container')}>Đang tải...</div>;
  }

  if (error) {
    return <div className={cx('container')}>{error}</div>;
  }

  if (!quizData || quizData.questions.length === 0) {
    return <div className={cx('container')}>Không có câu hỏi nào</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('test-info')}>
          <h2>{quizData.subject_name} - {quizData.test_name}</h2>
        </div>
        <div className={cx('question')}>
          <p className={cx('question-number')}>Câu {currentQuestion.question_id}:</p>
          <p
            className={cx('question-text')}
            dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
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

      <form className={cx('options')} aria-label={`Question ${currentQuestion.question_id} options`}>
        {currentQuestion.options.map((option) => (
          <label
            key={option.option_id}
            htmlFor={`option${option.option_id}`}
            className={cx('option', { selected: selectedOption === option.label })}
          >
            <span className={cx('option-label')}>{option.label}</span>
            <input
              type="radio"
              id={`option${option.option_id}`}
              name={`question${currentQuestion.question_id}`}
              value={option.label}
              checked={selectedOption === option.label}
              onChange={() => handleOptionChange(option.label)}
              className={cx('option-radio')}
            />
            <span
              className={cx('option-text', {
                selected: selectedOption === option.label,
              })}
            >
              {option.text}
            </span>
          </label>
        ))}
      </form>

      <nav className={cx('pagination')} aria-label="Pagination">
        {quizData.questions.map((q, index) => (
          <button
            key={q.question_id}
            type="button"
            className={cx('page-button', {
              active: index === currentQuestionIndex,
              semiActive: index === currentQuestionIndex - 1,
            })}
            aria-label={`Page ${q.question_id}`}
            aria-current={index === currentQuestionIndex ? 'page' : undefined}
            onClick={() => {
              setCurrentQuestionIndex(index);
              const correctOption = q.options.find((opt: Option) => opt.is_correct);
              setSelectedOption(correctOption?.label || '');
              setReviewChecked(q.isReviewed || false);
            }}
          >
            {q.question_id}
          </button>
        ))}
        <button
          type="button"
          className={cx('next-button')}
          aria-label="Next question"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizData.questions.length - 1}
        >
          Câu hỏi tiếp theo
        </button>
      </nav>
    </div>
  );
};

export default QuestionPage;