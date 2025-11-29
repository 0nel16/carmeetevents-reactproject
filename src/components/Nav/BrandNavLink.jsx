import { NavLink } from 'react-router';
import clsx from 'clsx';

import styles from './Nav.module.css';

export function BrandNavLink(props) {
  const receivedCls = props.className;
  return (
     <NavLink
        {...props} 
        className={({ isActive }) => clsx(receivedCls,  {[styles.active]: isActive})}
      />
  )
}
