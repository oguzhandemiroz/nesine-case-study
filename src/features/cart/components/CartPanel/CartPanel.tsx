import { memo } from "react";

import { Button, Icon } from "@/components/atoms";
import { MAX_WINNING } from "@/constants";
import { formatCurrency } from "@/utils/format";
import { useCart } from "@/features/cart/context/CartContext";
import { CartItem } from "@/features/cart/components/CartItem";
import { generateAmountList } from "@/features/cart/utils/generateAmountList";
import * as styles from "./CartPanel.module.scss";

const AMOUNT_OPTIONS = generateAmountList();

function CartPanelComponent() {
  const { items, removeItem, clearCart, totalOdds, itemCount, setAmount, amount } = useCart();

  const maxMBS = items.reduce((max, item) => {
    const val = parseInt(item.mbs, 10);
    return val > max ? val : max;
  }, 0);

  const remaining = maxMBS - itemCount;
  const maxPrice = Math.min(totalOdds * amount, MAX_WINNING);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Kupon</span>
        {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
      </div>

      {itemCount === 0 ? (
        <div className={styles.empty}>Kuponunuzda maç bulunmamaktadır</div>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </div>

          {remaining > 0 && (
            <div className={styles.mbsWarning}>
              MBS kuralı nedeniyle en az <strong>{remaining} bahis</strong> daha eklemelisiniz.
            </div>
          )}

          <div className={styles.footer}>
            <div className={styles.summary}>
              <div className={styles.totalRow}>
                <span>Maks. Oran</span>
                <div className={styles.totalValue}>{totalOdds.toFixed(2)}</div>
              </div>

              <div className={styles.amount}>
                <span>Kupon Tutarı</span>
                <select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
                  {AMOUNT_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.totalPrice}>
              <span>Maks. Kazanç</span>
              <div className={styles.price}>{formatCurrency(maxPrice)}</div>
            </div>

            <div className={styles.actions}>
              <Button variant="secondary" onClick={clearCart} aria-label="Kuponu temizle">
                <Icon name="delete" size={16} />
              </Button>
              <Button variant="primary" fullWidth disabled={remaining > 0} aria-label="Kupon yap">
                Kupon Yap
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const CartPanel = memo(CartPanelComponent);
