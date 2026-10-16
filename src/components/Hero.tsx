import './Hero.css';

interface HeroProps {
  onAddClick: () => void;
  onFeaturesClick: () => void;
}

export const Hero = ({ onAddClick, onFeaturesClick }: HeroProps) => {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <div className='badge'>Просто. Чисто. Каждый день.</div>
        <h1>Отслеживайте привычки без лишнего</h1>
        <p className='subtitle'>
          Одна колонка, много воздуха и только то, что нужно: список привычек,
          бейджи серии и форма добавления сверху.
        </p>
        <div className='buttons'>
          <button className='add-button' onClick={onAddClick}>
            Добавить привычку
          </button>
          <button className='features-button' onClick={onFeaturesClick}>
            Посмотреть возможности
          </button>
        </div>
      </div>
      <div className='mockup'>
        <div className='mockup-screen'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='mockup-item'>
              <div className='mockup-circle'></div>
              <div className='mockup-line'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}