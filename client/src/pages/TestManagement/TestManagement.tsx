import classNames from 'classnames/bind';
import styles from './TestManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
    faBook,
} from '@fortawesome/free-solid-svg-icons';
import { routes } from '~/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

// Mock data for subjects and tests
const mockData = [
    {
        id: 1,
        subject: 'Môn Abc',
        tests: [
            { id: 1, name: 'Test 1 - Abc', date: '2025-07-01', status: 'Active' },
            { id: 2, name: 'Test 2 - Abc', date: '2025-07-15', status: 'Draft' },
        ],
    },
    {
        id: 2,
        subject: 'Môn Xyz',
        tests: [
            { id: 1, name: 'Test 1 - Xyz', date: '2025-08-01', status: 'Active' },
        ],
    },
];

const TestManagement: React.FC = () => {
    const [subjects, setSubjects] = useState(mockData);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [newTestName, setNewTestName] = useState('');
    const nav = useNavigate()

    // Handle adding a new test
    const handleAddTest = (subjectId: number) => {
        if (!newTestName) return;
        const updatedSubjects = subjects.map((subject) => {
            if (subject.id === subjectId) {
                return {
                    ...subject,
                    tests: [
                        ...subject.tests,
                        {
                            id: subject.tests.length + 1,
                            name: newTestName,
                            date: new Date().toISOString().split('T')[0],
                            status: 'Draft',
                        },
                    ],
                };
            }
            return subject;
        });
        setSubjects(updatedSubjects);
        setNewTestName('');
    };

    const handleEditTest = () => {
        nav(routes.testEdit);
    };

    // Handle deleting a test
    const handleDeleteTest = (subjectId: number, testId: number) => {
        const updatedSubjects = subjects.map((subject) => {
            if (subject.id === subjectId) {
                return {
                    ...subject,
                    tests: subject.tests.filter((test) => test.id !== testId),
                };
            }
            return subject;
        });
        setSubjects(updatedSubjects);
    };

    return (
        <div className={cx('test-management')}>
            <header className={cx('header')}>
                <h1 className={cx('title')}>Quản lý bài kiểm tra</h1>
                <a href={routes.lms} className={cx('back-link')}>
                    <FontAwesomeIcon icon={faBook} className={cx('back-icon')} />
                    Quay lại Bảng tin LMS
                </a>
            </header>

            <div className={cx('content')}>
                {subjects.map((subject) => (
                    <div key={subject.id} className={cx('subject-section')}>
                        <div className={cx('subject-header')}>
                            <h2 className={cx('subject-title')}>
                                <FontAwesomeIcon icon={faBook} className={cx('subject-icon')} />
                                {subject.subject}
                            </h2>
                            <div className={cx('add-test')}>
                                <input
                                    type="text"
                                    placeholder="Tên bài kiểm tra mới"
                                    value={selectedSubject === subject.id ? newTestName : ''}
                                    onChange={(e) => {
                                        setSelectedSubject(subject.id);
                                        setNewTestName(e.target.value);
                                    }}
                                    className={cx('test-input')}
                                />
                                <button
                                    onClick={() => handleAddTest(subject.id)}
                                    className={cx('add-button')}
                                    disabled={!newTestName || selectedSubject !== subject.id}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Thêm
                                </button>
                            </div>
                        </div>

                        <table className={cx('test-table')}>
                            <thead>
                                <tr>
                                    <th>Tên bài kiểm tra</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subject.tests.length > 0 ? (
                                    subject.tests.map((test) => (
                                        <tr key={test.id}>
                                            <td>{test.name}</td>
                                            <td>{test.date}</td>
                                            <td>{test.status}</td>
                                            <td>
                                                <button className={cx('action-button', 'edit')} onClick={() => handleEditTest()}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button
                                                    className={cx('action-button', 'delete')}
                                                    onClick={() => handleDeleteTest(subject.id, test.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className={cx('no-tests')}>
                                            Chưa có bài kiểm tra nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestManagement;