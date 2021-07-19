import clsx from 'clsx';
import React, { HTMLProps } from 'react';
import './Button.css';

type Props = {
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'terciary'
} & HTMLProps<HTMLButtonElement>

const Button: React.FC<Props> = ({ children, color, className, ...props }) => {
  const a = 2;
  return (
    <button
      {...props}
      tabIndex={0}
      type="button"
      className={clsx({
        [`${className}`]: true,
        button: true,
        'button-primary': color === 'primary',
        'button-secondary': color === 'secondary',
        'button-terciary': color === 'terciary',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
