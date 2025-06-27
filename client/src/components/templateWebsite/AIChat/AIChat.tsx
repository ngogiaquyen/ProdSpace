import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AIChat.module.scss';

const cx = classNames.bind(styles);

// Define the TemplateType interface
interface TemplateType {
  name: string;
  category: string;
}

// Define the MessageType interface for messages
interface MessageType {
  sender: 'user' | 'ai';
  text: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi có thể giúp bạn chọn mẫu website phù hợp. Bạn muốn tạo website loại nào? (Ví dụ: Portfolio, Blog, Thương mại điện tử)',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [recommendedTemplate, setRecommendedTemplate] = useState<TemplateType | null>(null);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    // Simulate AI response
    let aiResponse = 'Tôi không hiểu rõ yêu cầu. Bạn có thể nói thêm về loại website bạn muốn?';
    let template: TemplateType | null = null;

    if (input.toLowerCase().includes('portfolio')) {
      aiResponse =
        'Tôi đề xuất mẫu "Portfolio Minimal". Nó hiện đại, tối giản, phù hợp để giới thiệu dự án cá nhân. Bạn muốn tạo website với mẫu này không?';
      template = { name: 'Portfolio Minimal', category: 'Portfolio & Đại lý' };
    } else if (input.toLowerCase().includes('blog')) {
      aiResponse = 'Mẫu "Blog Modern" rất phù hợp cho blog cá nhân hoặc chuyên nghiệp. Bạn muốn thử mẫu này không?';
      template = { name: 'Blog Modern', category: 'Blog & Biên tập' };
    } else if (input.toLowerCase().includes('thương mại')) {
      aiResponse =
        'Mẫu "E-Commerce Basic" lý tưởng cho cửa hàng trực tuyến. Bạn muốn tạo website bán hàng với mẫu này không?';
      template = { name: 'E-Commerce Basic', category: 'Bán lẻ & Thương mại điện tử' };
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
      if (template) setRecommendedTemplate(template);
    }, 500); // Simulate AI processing delay

    setInput('');
  };

  const handleCreateWebsite = () => {
    if (recommendedTemplate) {
      alert(
        `Đang tạo website với mẫu "${recommendedTemplate.name}" trong danh mục "${recommendedTemplate.category}"!`
      );
      // In a real app, this could trigger an API call to create the website
    }
  };

  return (
    <section className={cx('chat-container')}>
      <h2 className={cx('chat-title')}>Tư vấn mẫu website với AI</h2>
      <div className={cx('chat-box')}>
        <div className={cx('chat-messages')}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cx('message', {
                'message-user': msg.sender === 'user',
                'message-ai': msg.sender === 'ai',
              })}
            >
              <span className={cx('message-text')}>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className={cx('chat-input')}>
          <input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Hỏi về mẫu website..."
            className={cx('input-field')}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleSendMessage()
            }
          />
          <button
            className={cx('send-button')}
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            Gửi
          </button>
        </div>
        {recommendedTemplate && (
          <button className={cx('create-button')} onClick={handleCreateWebsite}>
            Tạo website với {recommendedTemplate.name}
          </button>
        )}
      </div>
    </section>
  );
};

export default AIChat;