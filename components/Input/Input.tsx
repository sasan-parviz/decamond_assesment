import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => (
  <div className={styles.inputGroup}>
    <label>{label}</label>
    <input ref={ref} {...rest} />
    {error && <span className={styles.error}>{error}</span>}
  </div>
));

Input.displayName = 'Input';
export default Input;
