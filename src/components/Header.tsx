import { useAuth } from '../context/AuthContext';
import './Header.css';

interface HeaderProps {
  onLoginClick: () => void;
}
export const Header = ({ onLoginClick }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <a href="#hero" className="header__logo">
          <span className="header__logo-icon">T</span>
          <span className="header__logo-text">Трекер привычек</span>
        </a>

        <nav className="header__nav">
          <a href="#hero" className="header__link">Главная</a>
          <a href="#features" className="header__link">Возможности</a>
          <a href="#contacts" className="header__link">Контакты</a>
        </nav>

        <div className="header__actions">
          {user ? (
            <button type="button" className="header__btn-logout" onClick={signOut}>
              Выйти
            </button>
          ) : (
            <button type="button" className="header__btn-login" onClick={onLoginClick}>
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};