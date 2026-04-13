import { memo, type CSSProperties } from "react";

import { BULLETIN_COLUMNS } from "@/features/bets/config/columns";
import * as styles from "./LeagueHeader.module.scss";

interface LeagueHeaderProps {
  date: string;
  day: string;
  leagueName: string;
  style?: CSSProperties;
}

function LeagueHeaderComponent({ date, day, leagueName, style }: LeagueHeaderProps) {
  return (
    <div className={styles.leagueHeader} style={style}>
      <div className={styles.info}>
        <span className={styles.leagueName}>{leagueName}</span>
        <span className={styles.date}>
          {date} ({day})
        </span>
      </div>

      <div />
      {BULLETIN_COLUMNS.map((group) =>
        group.odds.map((slot) => (
          <div key={`${group.ocgKey}_${slot.ocKey}`} className={styles.columnLabel}>
            {slot.label}
          </div>
        )),
      )}
    </div>
  );
}

export const LeagueHeader = memo(LeagueHeaderComponent);
