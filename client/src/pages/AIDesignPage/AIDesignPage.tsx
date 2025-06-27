import React, { useState, useRef, useEffect } from 'react';
import styles from './AIDesignPage.module.scss';

import { FaPaperPlane, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface DesignElement {
  id: string;
  type: 'header' | 'content' | 'footer';
  content: string;
  style: React.CSSProperties;
}

const AIDesignPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [designElements, setDesignElements] = useState<DesignElement[]>([
    { id: '1', type: 'header', content: 'Website Header', style: { backgroundColor: '#2c3e50', color: 'white', padding: '20px' } },
    { id: '2', type: 'content', content: 'Main Content Area', style: { backgroundColor: '#f8f9fa', padding: '40px' } },
    { id: '3', type: 'footer', content: 'Website Footer', style: { backgroundColor: '#2c3e50', color: 'white', padding: '20px' } },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: `AI: I understood your request: "${input}". How can I assist with your design?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage, aiResponse]);
    setInput('');
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleAddElement = () => {
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type: 'content',
      content: 'New Section',
      style: { backgroundColor: '#fff', padding: '20px', border: '1px solid #ddd' },
    };
    setDesignElements([...designElements, newElement]);
  };

  const handleEditElement = (id: string, newContent: string) => {
    setDesignElements(
      designElements.map((el) =>
        el.id === id ? { ...el, content: newContent } : el
      )
    );
  };

  return (
    <div className={styles.container}>
      {/* Chat Section */}
      <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <h2>AI Design Assistant</h2>
          <button onClick={handleClearChat} className={styles.clearButton}>
            <FaTrash /> Clear Chat
          </button>
        </div>
        <div className={styles.chatMessages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.aiMessage}`}
            >
              <div className={styles.messageContent}>
                <span>{msg.text}</span>
                <span className={styles.timestamp}>{msg.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className={styles.chatInput} onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your design..."
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {/* Design Section */}
      <div className={styles.designSection}>
        <div className={styles.designHeader}>
          <h2>Website Design Preview</h2>
          <button onClick={handleAddElement} className={styles.addButton}>
            <FaPlus /> Add Element
          </button>
        </div>
        <div className={styles.designCanvas}>
          {designElements.map((element) => (
            <div
              key={element.id}
              className={styles.designElement}
              style={element.style}
            >
              <div className={styles.elementContent}>
                {element.content}
                <button
                  className={styles.editButton}
                  onClick={() =>
                    handleEditElement(
                      element.id,
                      prompt('Edit content:', element.content) || element.content
                    )
                  }
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIDesignPage;