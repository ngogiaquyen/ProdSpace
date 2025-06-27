import React from 'react';
import classNames from 'classnames/bind';
import styles from './FAQ.module.scss';
import FAQItem from '../FAQItem';

const cx = classNames.bind(styles);

interface FAQItemType {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItemType[];
}
const FAQ: React.FC<FAQProps> = ({ faqs }) => {
    return (
        <section className={cx('faq')}>
            <h2 className={cx('faq-title')}>Câu hỏi thường gặp</h2>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </section>
    );
};

export default FAQ;