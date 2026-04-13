import { memo, forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import * as styles from "./Input.module.scss";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize = "md", leftIcon, rightIcon, fullWidth = false, className, type = "text", ...rest },
  ref,
) {
  const wrapperClass = [
    styles.wrapper,
    styles[inputSize],
    fullWidth && styles.fullWidth,
    leftIcon && styles.hasLeftIcon,
    rightIcon && styles.hasRightIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <input ref={ref} type={type} className={styles.input} {...rest} />
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </div>
  );
});

export const Input = memo(InputComponent);
