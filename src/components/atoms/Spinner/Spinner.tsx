import { memo } from "react";
import * as styles from "./Spinner.module.scss";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerVariant = "light" | "dark";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
};

function SpinnerComponent({ size = "md", variant = "light", label = "Yükleniyor" }: SpinnerProps) {
  const pixelSize = SIZE_MAP[size];
  const strokeWidth = size === "sm" ? 2 : size === "md" ? 2.5 : 3;
  const radius = (pixelSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const wrapperClass = [styles.wrapper, styles[variant]].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <svg
        className={styles.spinner}
        width={pixelSize}
        height={pixelSize}
        viewBox={`0 0 ${pixelSize} ${pixelSize}`}
        aria-hidden="true"
      >
        <circle
          className={styles.track}
          cx={pixelSize / 2}
          cy={pixelSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.indicator}
          cx={pixelSize / 2}
          cy={pixelSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

export const Spinner = memo(SpinnerComponent);
