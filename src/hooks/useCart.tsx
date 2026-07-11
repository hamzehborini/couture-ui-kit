import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem, Product, SuitColor, SuitSize } from "@/types";

type Action =
  | { type: "ADD"; product: Product; color: SuitColor; size: SuitSize; quantity: number }
  | { type: "REMOVE"; id: string; color: SuitColor; size: SuitSize }
  | { type: "SET_QTY"; id: string; color: SuitColor; size: SuitSize; quantity: number }
  | { type: "CLEAR" };

const keyOf = (id: string, c: string, s: string) => `${id}::${c}::${s}`;

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const k = keyOf(action.product.id, action.color, action.size);
      const idx = state.findIndex(
        (i) => keyOf(i.product.id, i.color, i.size) === k,
      );
      if (idx >= 0) {
        const next = [...state];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + action.quantity };
        return next;
      }
      return [
        ...state,
        {
          product: action.product,
          color: action.color,
          size: action.size,
          quantity: action.quantity,
        },
      ];
    }
    case "REMOVE":
      return state.filter(
        (i) => keyOf(i.product.id, i.color, i.size) !== keyOf(action.id, action.color, action.size),
      );
    case "SET_QTY":
      return state.map((i) =>
        keyOf(i.product.id, i.color, i.size) === keyOf(action.id, action.color, action.size)
          ? { ...i, quantity: Math.max(1, action.quantity) }
          : i,
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (p: Product, c: SuitColor, s: SuitSize, q: number) => void;
  remove: (id: string, c: SuitColor, s: SuitSize) => void;
  setQty: (id: string, c: SuitColor, s: SuitSize, q: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.product.price * i.quantity, 0);
    return {
      items,
      count,
      subtotal,
      add: (product, color, size, quantity) =>
        dispatch({ type: "ADD", product, color, size, quantity }),
      remove: (id, color, size) => dispatch({ type: "REMOVE", id, color, size }),
      setQty: (id, color, size, quantity) =>
        dispatch({ type: "SET_QTY", id, color, size, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}