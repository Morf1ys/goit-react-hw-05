
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'



const linlActive = ({ isActive }) => {
  return (css.link, isActive && css.active);
};


const Navigation = () => (
  <nav>
    <NavLink to="/" className={linlActive} end>Головна</NavLink>
    <NavLink to="/movies" className={linlActive}>Пошук фільмів</NavLink>
  </nav>
);

export default Navigation;
