import React, { useState } from 'react';
import styles from './ProfilePage.module.scss';
import { FaUser, FaCamera, FaSave, FaEdit } from 'react-icons/fa';

interface ProfileState {
  name: string;
  email: string;
  avatar: string | null;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (): void => {
    setIsEditing(false);
    alert('Profile saved!');
    // Có thể thêm logic lưu vào localStorage hoặc API
    // localStorage.setItem('profile', JSON.stringify(profile));
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>Profile</h2>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${activeTab === 'info' ? styles.active : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <FaUser /> Personal Info
          </li>
          <li
            className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaEdit /> Security
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>{activeTab === 'info' ? 'Personal Information' : 'Security Settings'}</h1>
          {activeTab === 'info' && (
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit /> {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>

        {activeTab === 'info' && (
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <FaUser />
                </div>
              )}
              {isEditing && (
                <label className={styles.avatarUpload}>
                  <FaCamera /> Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={styles.avatarInput}
                  />
                </label>
              )}
            </div>
            <div className={styles.profileItem}>
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                <span>{profile.name}</span>
              )}
            </div>
            <div className={styles.profileItem}>
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                <span>{profile.email}</span>
              )}
            </div>
            {isEditing && (
              <button className={styles.saveButton} onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.profileSection}>
            <div className={styles.profileItem}>
              <label>Password</label>
              <button className={styles.optionButton}>Change Password</button>
            </div>
            <div className={styles.profileItem}>
              <label>Two-Factor Authentication</label>
              <button className={styles.optionButton}>Enable 2FA</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;