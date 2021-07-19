import clsx from 'clsx';
import React, { ForwardedRef } from 'react';
import logo from '../../assets/images/SWORD_Health_logo.svg';
import './Header.css';

type Props = {
  isTransparent: boolean
}

const Header = React.forwardRef((props: Props, ref: ForwardedRef<HTMLElement>) => (
  <header ref={ref} className="header">
    <img width="200px" height="auto" src={logo} alt="logo" />
    <div>
      <strong className="challenge-type">Frontend developer</strong>
      <p className="meta-challenge">Challenge</p>
    </div>
    <div className={
      clsx({
        'header-helper': true,
        'header-helper-transparent': props.isTransparent
      })
    }
    />
  </header>
));

export default Header;
