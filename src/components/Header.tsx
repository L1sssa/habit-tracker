import './Header.css';

interface HeaderProps {
  onAddClick: () => void;
}

export const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className='header'>
      <div className='logo'>
        <div className='logo-square'>T</div>
        <div className='title'>Трекер привычек</div>
      </div>
      <div className='nav-links'>
        <a href='#'>Главная</a>
        <a href='#'>Возможности</a>
        <a href='#'>Контакты</a>
      </div>
      <button className='add-button' onClick={onAddClick}>
        Добавить привычку
      </button>
    </header>
  );
}