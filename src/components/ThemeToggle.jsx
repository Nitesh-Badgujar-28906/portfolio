import { useTheme } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-container">
        <div className={`toggle-ball ${isDarkMode ? 'dark' : 'light'}`}>
          <span className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;