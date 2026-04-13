import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { CartItem } from "@/features/bets/types";
import { CART_STORAGE_KEY } from "@/constants";

interface CartState {
  items: CartItem[];
  amount: number;
}

type CartAction =
  | { type: "TOGGLE_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "CLEAR" };

const initialState: CartState = {
  items: [],
  amount: 1,
};

const loadInitial = (): CartState => {
  try {
    const items = localStorage.getItem(CART_STORAGE_KEY);
    if (!items) {
      return initialState;
    }

    const parsed = JSON.parse(items);

    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }

    return initialState;
  } catch {
    return initialState;
  }
};

function persistState(state: CartState): CartState {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  return state;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const { matchCode, id } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.matchCode === matchCode);

      if (existingIndex === -1) {
        return persistState({
          ...state,
          items: [...state.items, action.payload],
        });
      }

      if (state.items[existingIndex].id === id) {
        return persistState({
          ...state,
          items: state.items.filter((_, i) => i !== existingIndex),
        });
      }

      return persistState({
        ...state,
        items: state.items.map((item, i) => (i === existingIndex ? action.payload : item)),
      });
    }
    case "REMOVE_ITEM":
      return persistState({
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      });
    case "SET_AMOUNT":
      return persistState({
        ...state,
        amount: action.payload,
      });
    case "CLEAR":
      return persistState(initialState);
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  toggleItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isSelected: (id: string) => boolean;
  totalOdds: number;
  itemCount: number;
  setAmount: (amount: number) => void;
  amount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, loadInitial());

  const selectedSet = useMemo(() => new Set(state.items.map((i) => i.id)), [state.items]);

  const isSelected = useCallback((id: string) => selectedSet.has(id), [selectedSet]);

  const toggleItem = useCallback((item: CartItem) => {
    dispatch({ type: "TOGGLE_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const setAmount = useCallback((amount: number) => {
    dispatch({ type: "SET_AMOUNT", payload: amount });
  }, []);

  const totalOdds = useMemo(
    () => state.items.reduce((acc, item) => acc * parseFloat(item.oddValue), 1),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      toggleItem,
      removeItem,
      clearCart,
      isSelected,
      setAmount,
      amount: state.amount,
      totalOdds,
      itemCount: state.items.length,
    }),
    [
      state.items,
      toggleItem,
      removeItem,
      clearCart,
      isSelected,
      setAmount,
      state.amount,
      totalOdds,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
