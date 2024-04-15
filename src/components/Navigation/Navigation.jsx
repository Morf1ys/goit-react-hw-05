import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'


const linkActive = ({ isActive }) => {
  return isActive ? `${css.link} ${css.active}` : css.link;
};


const Navigation = () => (
  <nav className={css['head-cont']}>
    <NavLink to="/" className={linkActive} end>Home</NavLink>
    <NavLink to="/movies" className={linkActive}>Movies</NavLink>
  </nav>
);

export default Navigation;
