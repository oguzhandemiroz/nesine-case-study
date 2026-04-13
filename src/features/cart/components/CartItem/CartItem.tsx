import { memo, useCallback } from "react";

import { Button, Icon } from "@/components/atoms";
import type { CartItem as CartItemType } from "@/features/bets/types";
import * as styles from "./CartItem.module.scss";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

function CartItemComponent({ item, onRemove }: CartItemProps) {
  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <span className={styles.matchName}>{item.matchName}</span>
        <span className={styles.detail}>
          {item.ocgName}: {item.ocName}
        </span>
      </div>

      <div className={styles.right}>
        <span className={styles.oddValue}>{item.oddValue}</span>
        <Button
          size="sm"
          variant="ghost"
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Kaldır"
        >
          <Icon name="close" size={14} />
        </Button>
      </div>
    </div>
  );
}

export const CartItem = memo(CartItemComponent);
