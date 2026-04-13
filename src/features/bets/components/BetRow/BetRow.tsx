import { memo, useCallback, type CSSProperties } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Badge, Button, Icon } from "@/components/atoms";
import { selectBetById } from "@/features/bets/store/betsSlice";
import { selectIsFavorite, toggleFavorite } from "@/features/bets/store/favoritesSlice";
import { BULLETIN_COLUMNS } from "@/features/bets/config/columns";
import { OddCell } from "@/features/bets/components/OddCell";
import * as styles from "./BetRow.module.scss";

interface BetRowProps {
  betId: string;
  style?: CSSProperties;
}

function BetRowComponent({ betId, style }: BetRowProps) {
  const dispatch = useAppDispatch();
  const bet = useAppSelector((state) => selectBetById(state, betId));
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, betId));

  const handleFavoriteClick = useCallback(() => {
    dispatch(toggleFavorite({ id: betId }));
  }, [dispatch, betId]);

  if (!bet) {
    return null;
  }

  return (
    <div className={styles.row} style={style}>
      <div>
        <Button
          variant="ghost"
          className={styles.favorite}
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          onClick={handleFavoriteClick}
        >
          <Icon name={isFavorite ? "star-filled" : "star"} size={20} />
        </Button>
      </div>
      <div className={styles.time}>{bet.T}</div>
      <div className={styles.betInfo}>
        <span className={styles.betName}>{bet.N}</span>
      </div>
      <div title="Minimum Bahis Sayısı">
        <Badge variant="count">{bet.OCG["1"]?.MBS}</Badge>
      </div>

      {BULLETIN_COLUMNS.map((group) =>
        group.odds.map((slot) => {
          const odd = bet.OCG[group.ocgKey]?.OC[slot.ocKey] ?? null;
          return (
            <OddCell
              key={`${group.ocgKey}_${slot.ocKey}`}
              odd={odd}
              bet={bet}
              ocgId={group.ocgKey}
              categoryName={group.label}
            />
          );
        }),
      )}
    </div>
  );
}

export const BetRow = memo(BetRowComponent);
