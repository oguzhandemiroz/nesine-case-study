import { memo, useCallback, type ChangeEvent } from "react";

import { useMediaQuery } from "@/hooks";
import { TABLET_QUERY } from "@/constants";
import { Input, Icon, Button } from "@/components/atoms";
import { useCart } from "@/features/cart/context/CartContext";
import * as styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  onCartOpen?: () => void;
}

function SearchBarComponent({
  value,
  onChange,
  showFavoritesOnly,
  onToggleFavorites,
  onCartOpen,
}: SearchBarProps) {
  const { itemCount } = useCart();
  const isTablet = useMediaQuery(TABLET_QUERY);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBarContainer}>
        <div className={styles.favoriteButtonContainer}>
          <Button
            variant="ghost"
            className={`${styles.favoriteButton} ${showFavoritesOnly ? styles.favoriteButtonActive : ""}`}
            onClick={onToggleFavorites}
            aria-label={showFavoritesOnly ? "Tüm maçları göster" : "Sadece favorileri göster"}
          >
            <Icon name={showFavoritesOnly ? "star-filled" : "star"} size={24} />
          </Button>
        </div>
        <Input
          placeholder="Lig veya takım ara..."
          aria-label="Lig veya takım ara"
          value={value}
          onChange={handleChange}
          leftIcon={<Icon name="search" size={14} />}
        />
      </div>
      {isTablet && (
        <Button style={{ width: "140px" }} onClick={onCartOpen} aria-label="Kuponum">
          Kupon ({itemCount})
        </Button>
      )}
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
