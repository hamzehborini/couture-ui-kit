export type SuitColor = "Black" | "Silver" | "Gold";
export type SuitSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  fabric: string;
  fabricMill: string;
  colors: SuitColor[];
  sizes: SuitSize[];
  images: string[];
}

export interface CartItem {
  product: Product;
  color: SuitColor;
  size: SuitSize;
  quantity: number;
}