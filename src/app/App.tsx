import { useEffect, useMemo, useState, useCallback, type ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button, Spinner } from "@/components/atoms";
import { Layout } from "@/app/Layout";
import { selectFavoriteIds } from "@/features/bets/store/favoritesSlice";
import { useDebounce } from "@/hooks";
import { BetBoard, SearchBar } from "@/features/bets/components";
import { CartPanel } from "@/features/cart/components";
import { filterBySearch } from "@/features/bets/utils/filterBySearch";
import { groupByLeague } from "@/features/bets/utils/groupByLeague";
import { buildFlatList } from "@/features/bets/utils/buildFlatList";
import {
  fetchBets,
  selectAllBets,
  selectBetsStatus,
  selectBetsError,
} from "@/features/bets/store/betsSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const bets = useAppSelector(selectAllBets);
  const status = useAppSelector(selectBetsStatus);
  const error = useAppSelector(selectBetsError);
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchBets());
  }, [dispatch]);

  const flatList = useMemo(() => {
    let result = bets;

    if (showFavoritesOnly) {
      result = result.filter((bet) => favoriteIds.includes(bet.C));
    }

    if (debouncedSearch) {
      result = filterBySearch(result, debouncedSearch);
    }

    const grouped = groupByLeague(result);
    return buildFlatList(grouped);
  }, [bets, debouncedSearch, favoriteIds, showFavoritesOnly]);

  const handleRetry = useCallback(() => {
    dispatch(fetchBets());
  }, [dispatch]);

  const handleToggleFavorites = useCallback(() => {
    setShowFavoritesOnly((prev) => !prev);
  }, []);

  const handleOpenMobileCart = useCallback(() => {
    setIsMobileCartOpen(true);
  }, []);

  const handleCloseMobileCart = useCallback(() => {
    setIsMobileCartOpen(false);
  }, []);

  const toolbarSlot = (
    <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      showFavoritesOnly={showFavoritesOnly}
      onToggleFavorites={handleToggleFavorites}
      onCartOpen={handleOpenMobileCart}
    />
  );

  const sidebarSlot = <CartPanel />;

  let mainSlot: ReactNode;

  if (status === "loading") {
    mainSlot = (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Spinner size="lg" variant="light" label="Bülten yükleniyor" />
      </div>
    );
  } else if (status === "failed") {
    mainSlot = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <p style={{ marginBottom: "12px" }}>Bülten yüklenemedi: {error}</p>
        <Button variant="secondary" onClick={handleRetry}>
          Tekrar Dene
        </Button>
      </div>
    );
  } else if (flatList.length === 0) {
    mainSlot = (
      <div style={{ textAlign: "center", padding: "40px 0", color: "#93afb4" }}>
        Sonuç bulunamadı
      </div>
    );
  } else {
    mainSlot = <BetBoard flatList={flatList} />;
  }

  return (
    <Layout
      toolbar={toolbarSlot}
      main={mainSlot}
      sidebar={sidebarSlot}
      isMobileCartOpen={isMobileCartOpen}
      onCloseMobileCart={handleCloseMobileCart}
    />
  );
}
