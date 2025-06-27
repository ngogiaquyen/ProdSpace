import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BeNgoanCard2.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

// Khai báo kiểu props cho component
export interface BeNgoanCard2Props {
  tenBe?: string;
  tuoi?: number;
  ngay: string;
  noiDung: string;
  range: string;
  avatarUrl?: string;
}

const BeNgoanCard2: React.FC<BeNgoanCard2Props> = ({
  tenBe = 'Hong Anh',
  tuoi = 20,
  ngay,
  noiDung,
  range,
  avatarUrl = images.avta4,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [visibleSticker, setVisibleSticker] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < noiDung.length) {
        const contentWithBreaks = noiDung.slice(0, i + 1).replace(/\n/g, '<br />');
        setDisplayedContent(contentWithBreaks);
        i++;
      } else {
        clearInterval(interval);
        setVisibleSticker(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [noiDung]);

  return (
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <h2 className={cx('title')}>🎖️ Phiếu Bé Ngoan 🎖️</h2>
        <div className={cx('date-badge')}>
          <span className={cx('date-icon')}>📅</span>
          <span className={cx('date-text')}>{ngay}</span>
        </div>
      </div>

      <div className={cx('card-body')}>
        <div className={cx('profile-section')}>
          <div className={cx('avatar-container')}>
            <img className={cx('avatar')} src={avatarUrl} alt="Avatar" />
          </div>
          <div className={cx('info')}>
            <p className={cx('child-name')}>👦 Bé: {tenBe}</p>
            <p className={cx('child-age')}>🎂 Tuổi: {tuoi}</p>
          </div>
        </div>

        <div className={cx('content-box')}>
          <h3 className={cx('content-title')}>Nhận xét</h3>
          <div className={cx('content')}>
            <p className={cx('content-show')} dangerouslySetInnerHTML={{ __html: displayedContent }}></p>
            <p className={cx('content-hide')}>{noiDung}</p>
          </div>
        </div>
      </div>

      <div className={cx('card-footer')}>
        <div className={cx('sticker', { visible: visibleSticker })}>{range}</div>
      </div>
    </div>
  );
};

export default BeNgoanCard2;
