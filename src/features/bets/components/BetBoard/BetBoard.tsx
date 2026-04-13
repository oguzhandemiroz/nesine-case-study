import { memo, useCallback } from "react";
import { List, type RowComponentProps } from "react-window";

import { OVERSCAN_COUNT, ROW_HEIGHT, MOBILE_ROW_HEIGHT, TABLET_QUERY } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { BetRow } from "@/features/bets/components/BetRow";
import { LeagueHeader } from "@/features/bets/components/LeagueHeader";
import type { FlatListItem } from "@/features/bets/utils/buildFlatList";
import * as styles from "./BetBoard.module.scss";

interface BetBoardProps {
  flatList: FlatListItem[];
}

type RowProps = {
  flatList: FlatListItem[];
};

function RowRenderer({ index, style, flatList }: RowComponentProps<RowProps>) {
  const item = flatList[index];

  if (item.type === "league-header") {
    return (
      <LeagueHeader style={style} date={item.date} day={item.day} leagueName={item.leagueName} />
    );
  }

  return <BetRow style={style} betId={item.betId} />;
}

function BetBoardComponent({ flatList }: BetBoardProps) {
  const isTablet = useMediaQuery(TABLET_QUERY);

  const getRowHeight = useCallback(
    (_: number) => {
      if (!isTablet) {
        return ROW_HEIGHT;
      }

      return MOBILE_ROW_HEIGHT;
    },
    [isTablet],
  );

  return (
    <div className={styles.container}>
      <List<RowProps>
        data-virtualized-list=""
        rowComponent={RowRenderer}
        rowCount={flatList.length}
        rowHeight={getRowHeight}
        overscanCount={OVERSCAN_COUNT}
        rowProps={{ flatList }}
        style={{
          height: "100%",
          scrollbarWidth: "thin",
        }}
      />
    </div>
  );
}

export const BetBoard = memo(BetBoardComponent);
