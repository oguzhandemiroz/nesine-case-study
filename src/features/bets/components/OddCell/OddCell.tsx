import { memo, useCallback } from "react";

import { useCart } from "@/features/cart/context/CartContext";
import type { Bet, OddsChoice } from "@/features/bets/types";
import * as styles from "./OddCell.module.scss";

interface OddCellProps {
  odd: OddsChoice | null;
  bet: Bet;
  ocgId: string;
  categoryName: string;
}

function OddCellComponent({ odd, bet, ocgId, categoryName }: OddCellProps) {
  const { toggleItem, isSelected } = useCart();

  const compositeId = odd ? `${bet.C}-${ocgId}-${odd.ID}` : "";
  const selected = odd ? isSelected(compositeId) : false;

  const handleClick = useCallback(() => {
    if (!odd) {
      return;
    }

    toggleItem({
      id: compositeId,
      matchCode: bet.C,
      matchName: bet.N,
      ocgId,
      ocgName: categoryName,
      ocId: odd.ID,
      ocName: odd.N,
      oddValue: odd.O,
      mbs: odd.MBS,
    });
  }, [compositeId, toggleItem, bet.C, bet.N, ocgId, categoryName, odd]);

  if (!odd) {
    return <div className={`${styles.oddCell} ${styles.oddEmpty}`}>-</div>;
  }

  const className = selected ? `${styles.oddCell} ${styles.oddSelected}` : styles.oddCell;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={`${odd.O} seç`}
      role="button"
    >
      {odd.O}
    </button>
  );
}

export const OddCell = memo(OddCellComponent);
