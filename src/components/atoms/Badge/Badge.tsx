import { memo, type ReactNode } from "react";

import * as styles from "./Badge.module.scss";

export type BadgeVariant = "default" | "live" | "count" | "muted";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

function BadgeComponent({ variant = "default", children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}

export const Badge = memo(BadgeComponent);
