import React, { useState } from 'react';
import styles from './SettingsPage.module.scss';
import { FaSun, FaMoon, FaGlobe, FaBell, FaSave } from 'react-icons/fa';

interface SettingsState {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
  notifications: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'light',
    language: 'en',
    notifications: true,
  });
  const [activeTab, setActiveTab] = useState<'general' | 'notifications'>('general');

  const handleThemeChange = (theme: 'light' | 'dark'): void => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleLanguageChange = (language: 'en' | 'vi'): void => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const handleNotificationsToggle = (): void => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const handleSave = (): void => {
    // Simulate saving settings (e.g., to localStorage or API)
    alert('Settings saved!');
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>Settings</h2>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${activeTab === 'general' ? styles.active : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <FaGlobe /> General
          </li>
          <li
            className={`${styles.navItem} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>{activeTab === 'general' ? 'General Settings' : 'Notification Settings'}</h1>
          <button className={styles.saveButton} onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
        </div>

        {activeTab === 'general' && (
          <div className={styles.settingsSection}>
            <div className={styles.settingItem}>
              <label>Theme</label>
              <div className={styles.options}>
                <button
                  className={`${styles.optionButton} ${settings.theme === 'light' ? styles.active : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <FaSun /> Light
                </button>
                <button
                  className={`${styles.optionButton} ${settings.theme === 'dark' ? styles.active : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <FaMoon /> Dark
                </button>
              </div>
            </div>
            <div className={styles.settingItem}>
              <label>Language</label>
              <select
                className={styles.select}
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'vi')}
              >
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className={styles.settingsSection}>
            <div className={styles.settingItem}>
              <label>Enable Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={handleNotificationsToggle}
                className={styles.checkbox}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;