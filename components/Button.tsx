import { ButtonProps } from '../utils/types';

const Button = ({
  children,
  variant = 'default',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={`btn ${variant} + (disabled ? ' disabled' : '') + ' ' + ${className}`}
      disabled={disabled}
      {...props}>{children}
    </button>
  );
};

export default Button;