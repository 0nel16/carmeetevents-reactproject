import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export function BrandNavLink(props) {
  const receivedCls = props.className;
  return (
    <NavLink
      {...props}
      className={({ isActive }) => clsx(receivedCls, { active: isActive })}
    />
  );
}
