import classNames from 'classnames/bind';
import styles from './TestEdit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { routes } from '~/config';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

interface Test {
  id: number;
  name: string;
  date: string;
  status: string;
  questions: Question[];
}

interface Subject {
  id: number;
  subject: string;
  tests: Test[];
}

const initialData: Subject[] = [
  {
    id: 1,
    subject: 'Môn Abc',
    tests: [
      {
        id: 1,
        name: 'Test 1 - Abc',
        date: '2025-07-01',
        status: 'Active',
        questions: [
          {
            id: 1,
            text: 'Câu hỏi 1: 1 + 1 = ?',
            options: [
              { label: 'A', text: '2', isCorrect: true },
              { label: 'B', text: '3', isCorrect: false },
              { label: 'C', text: '4', isCorrect: false },
              { label: 'D', text: '5', isCorrect: false },
            ],
          },
          {
            id: 2,
            text: 'Câu hỏi 2: Thủ đô Việt Nam là đâu?',
            options: [
              { label: 'A', text: 'Hà Nội', isCorrect: true },
              { label: 'B', text: 'TP.HCM', isCorrect: false },
              { label: 'C', text: 'Đà Nẵng', isCorrect: false },
              { label: 'D', text: 'Huế', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Test 2 - Abc',
        date: '2025-07-15',
        status: 'Draft',
        questions: [],
      },
    ],
  },
  {
    id: 2,
    subject: 'Môn Xyz',
    tests: [
      {
        id: 1,
        name: 'Test 1 - Xyz',
        date: '2025-08-01',
        status: 'Active',
        questions: [
          {
            id: 1,
            text: 'Câu hỏi 1: Màu của bầu trời là gì?',
            options: [
              { label: 'A', text: 'Xanh', isCorrect: true },
              { label: 'B', text: 'Đỏ', isCorrect: false },
              { label: 'C', text: 'Vàng', isCorrect: false },
              { label: 'D', text: 'Tím', isCorrect: false },
            ],
          },
        ],
      },
    ],
  },
];

const TestEdit: React.FC = () => {
//   const { subjectId, testId } = useParams<{ subjectId: string; testId: string }>();
    const subjectId = "1"
    const testId = "1"
  const navigate = useNavigate();

  // State for subjects (includes tests and questions)
  const [subjects, setSubjects] = useState<Subject[]>(initialData);

  // Find the subject and test
//   const subject = subjects.find((s) => s.id === parseInt(subjectId || '0'));
//   const test = subject?.tests.find((t) => t.id === parseInt(testId || '0'));

  const subject = subjects.find((s) => s.id === parseInt(subjectId));
  const test = subject?.tests.find((t) => t.id === parseInt(testId));

  // State for questions and new question form
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState<Option[]>([
    { label: 'A', text: '', isCorrect: false },
    { label: 'B', text: '', isCorrect: false },
    { label: 'C', text: '', isCorrect: false },
    { label: 'D', text: '', isCorrect: false },
  ]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editQuestionText, setEditQuestionText] = useState('');
  const [editOptions, setEditOptions] = useState<Option[]>([]);

  useEffect(()=>{
    setSubjects(initialData);
    console.log(initialData)
  } ,[])

  // Redirect if test or subject not found
  useEffect(() => {
    if (!subject || !test) {
    //   navigate(routes.testManagement);
    }
    console.log(subject, test)
  }, [subject, test, navigate]);

  // Handle adding a new question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || newOptions.some((opt) => !opt.text)) return;

    const newQuestion: Question = {
      id: test?.questions.length ? test.questions.length + 1 : 1,
      text: newQuestionText,
      options: newOptions.map((opt) => ({ ...opt })),
    };

    const updatedSubjects = subjects.map((s) =>
      s.id === parseInt(subjectId || '0')
        ? {
            ...s,
            tests: s.tests.map((t) =>
              t.id === parseInt(testId || '0')
                ? { ...t, questions: [...t.questions, newQuestion] }
                : t
            ),
          }
        : s
    );

    setSubjects(updatedSubjects);
    setNewQuestionText('');
    setNewOptions([
      { label: 'A', text: '', isCorrect: false },
      { label: 'B', text: '', isCorrect: false },
      { label: 'C', text: '', isCorrect: false },
      { label: 'D', text: '', isCorrect: false },
    ]);
  };

  // Handle editing a question
  const handleEditQuestion = (question: Question) => {
    setEditingQuestionId(question.id);
    setEditQuestionText(question.text);
    setEditOptions(question.options.map((opt) => ({ ...opt })));
  };

  // Handle saving edited question
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editQuestionText || editOptions.some((opt) => !opt.text)) return;

    const updatedSubjects = subjects.map((s) =>
      s.id === parseInt(subjectId || '0')
        ? {
            ...s,
            tests: s.tests.map((t) =>
              t.id === parseInt(testId || '0')
                ? {
                    ...t,
                    questions: t.questions.map((q) =>
                      q.id === editingQuestionId
                        ? { ...q, text: editQuestionText, options: editOptions.map((opt) => ({ ...opt })) }
                        : q
                    ),
                  }
                : t
            ),
          }
        : s
    );

    setSubjects(updatedSubjects);
    setEditingQuestionId(null);
    setEditQuestionText('');
    setEditOptions([]);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (questionId: number) => {
    const updatedSubjects = subjects.map((s) =>
      s.id === parseInt(subjectId || '0')
        ? {
            ...s,
            tests: s.tests.map((t) =>
              t.id === parseInt(testId || '0')
                ? { ...t, questions: t.questions.filter((q) => q.id !== questionId) }
                : t
            ),
          }
        : s
    );

    setSubjects(updatedSubjects);
  };

  // Update option text or isCorrect
  const handleOptionChange = (
    options: Option[],
    setOptions: React.Dispatch<React.SetStateAction<Option[]>>,
    index: number,
    field: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : { ...opt, isCorrect: field === 'isCorrect' && value ? false : opt.isCorrect }
    );
    setOptions(updatedOptions);
  };

  if (!subject || !test) return null;

  return (
    <div className={cx('test-edit')}>
      <header className={cx('header')}>
        <h1 className={cx('title')}>
          Chỉnh sửa câu hỏi - {subject.subject} - {test.name}
        </h1>
        <Link to={routes.testManagement} className={cx('back-link')}>
          <FontAwesomeIcon icon={faTimes} className={cx('back-icon')} />
          Quay lại Quản lý bài kiểm tra
        </Link>
      </header>

      <div className={cx('quiz-section')}>
        <h2 className={cx('quiz-title')}>Danh Sách Câu Hỏi</h2>
        {test.questions.length > 0 ? (
          test.questions.map((question) => (
            <div key={question.id} className={cx('question')}>
              {editingQuestionId === question.id ? (
                <form onSubmit={handleSaveEdit} className={cx('edit-form')}>
                  <div className={cx('form-group')}>
                    <label>Câu hỏi</label>
                    <input
                      type="text"
                      value={editQuestionText}
                      onChange={(e) => setEditQuestionText(e.target.value)}
                      className={cx('input')}
                      required
                    />
                  </div>
                  {editOptions.map((option, index) => (
                    <div key={option.label} className={cx('form-group')}>
                      <label>{option.label}. Đáp án</label>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(editOptions, setEditOptions, index, 'text', e.target.value)
                        }
                        className={cx('input')}
                        required
                      />
                      <label className={cx('correct-label')}>
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={(e) =>
                            handleOptionChange(editOptions, setEditOptions, index, 'isCorrect', e.target.checked)
                          }
                        />
                        Đáp án đúng
                      </label>
                    </div>
                  ))}
                  <div className={cx('form-actions')}>
                    <button type="submit" className={cx('save-button')}>
                      <FontAwesomeIcon icon={faSave} /> Lưu
                    </button>
                    <button
                      type="button"
                      className={cx('cancel-button')}
                      onClick={() => setEditingQuestionId(null)}
                    >
                      <FontAwesomeIcon icon={faTimes} /> Hủy
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={cx('question-header')}>
                    <p className={cx('question-text')}>
                      Câu {question.id}: {question.text}
                    </p>
                    <div className={cx('question-actions')}>
                      <button
                        className={cx('action-button', 'edit')}
                        onClick={() => handleEditQuestion(question)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className={cx('action-button', 'delete')}
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
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
                </>
              )}
            </div>
          ))
        ) : (
          <p className={cx('no-questions')}>Chưa có câu hỏi nào</p>
        )}
      </div>

      <form onSubmit={handleAddQuestion} className={cx('add-form')}>
        <h2 className={cx('add-title')}>Thêm Câu Hỏi Mới</h2>
        <div className={cx('form-group')}>
          <label>Câu hỏi</label>
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className={cx('input')}
            placeholder="Nhập câu hỏi"
            required
          />
        </div>
        {newOptions.map((option, index) => (
          <div key={option.label} className={cx('form-group')}>
            <label>{option.label}. Đáp án</label>
            <input
              type="text"
              value={option.text}
              onChange={(e) =>
                handleOptionChange(newOptions, setNewOptions, index, 'text', e.target.value)
              }
              className={cx('input')}
              placeholder={`Nhập đáp án ${option.label}`}
              required
            />
            <label className={cx('correct-label')}>
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionChange(newOptions, setNewOptions, index, 'isCorrect', e.target.checked)
                }
              />
              Đáp án đúng
            </label>
          </div>
        ))}
        <button type="submit" className={cx('add-button')}>
          <FontAwesomeIcon icon={faPlus} /> Thêm Câu Hỏi
        </button>
      </form>
    </div>
  );
};

export default TestEdit;