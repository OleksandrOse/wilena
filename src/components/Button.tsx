import { FC, ReactNode } from 'react';
import '../styles/Button.scss';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`button button--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
