import { type ReactNode, useRef, useCallback } from "react";

import { TABLET_QUERY } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { Button, Icon } from "@/components/atoms";
import * as styles from "./Layout.module.scss";

interface LayoutProps {
  toolbar: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
  isMobileCartOpen?: boolean;
  onCloseMobileCart?: () => void;
}

export function Layout({
  toolbar,
  main,
  sidebar,
  isMobileCartOpen = false,
  onCloseMobileCart,
}: LayoutProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const isTablet = useMediaQuery(TABLET_QUERY);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (sidebarRef.current?.contains(target)) return;

    const scrollable = mainRef.current?.querySelector<HTMLElement>("[data-virtualized-list]");
    if (!scrollable || scrollable.contains(target)) return;

    scrollable.scrollTop += e.deltaY;
  }, []);

  return (
    <div className={styles.layout} onWheel={handleWheel}>
      <div className={styles.body}>
        <div className={styles.mainColumn}>
          <div className={styles.toolbar}>{toolbar}</div>
          <div className={styles.main} ref={mainRef}>
            {main}
          </div>
        </div>

        {!isTablet && (
          <aside ref={sidebarRef} className={styles.sidebar}>
            {sidebar}
          </aside>
        )}
      </div>

      {isTablet && isMobileCartOpen && (
        <div className={styles.mobileCartOverlay}>
          <div className={styles.mobileCartHeader}>
            <span className={styles.mobileCartTitle}>Kupon</span>
            <Button variant="ghost" onClick={onCloseMobileCart} aria-label="Kuponu kapat">
              <Icon name="close" size={20} />
            </Button>
          </div>
          <div className={styles.mobileCartBody}>{sidebar}</div>
        </div>
      )}
    </div>
  );
}
