
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>404 - Сторінку не знайдено</h1>
    <p>{`На жаль, сторінка, яку ви шукаєте, не існує.`}</p>
    <Link to="/">Повернутися на головну сторінку</Link>
  </div>
);

export default NotFoundPage;
