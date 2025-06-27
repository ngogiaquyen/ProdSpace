import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  DocumentIcon, 
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import styles from './Sidebar.module.scss';
import { routes } from '~/config';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Trang chủ', path: routes.home, icon: HomeIcon },
  { name: 'Thiết kế của bạn', path: '/projects', icon: DocumentIcon },
  { name: 'Cá nhân', path: '/profile', icon: UserIcon },
  { name: 'Cài đặt', path: '/settings', icon: CogIcon },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Logo/Brand */}
      <div className={styles.header}>
        {!isCollapsed && <h1 className={styles.logo}>SpaceW</h1>}
        <button 
          onClick={toggleSidebar}
          className={styles.toggleButton}
        >
          {isCollapsed ? <ChevronRightIcon className={styles.icon} /> : <ChevronLeftIcon className={styles.icon} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
              >
                <item.icon className={styles.icon} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        {!isCollapsed && <p className={styles.footerText}>© 2025 DesignHub</p>}
      </div>
    </div>
  );
};

export default Sidebar;