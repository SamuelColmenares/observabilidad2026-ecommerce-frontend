import React from "react";
import type { Product } from "../product/Product";
import type { ShoppingCar } from "../shopping-car/shopping-car";

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  isSearchDirty: boolean;
  setProducts: (products: Product[]) => void;
}

export const ProductsContext = React.createContext<
  ProductsContextType | undefined
>(undefined);

interface ShoppingCarType {
  shoppingCar: ShoppingCar[];
  setShoppingCar: React.Dispatch<React.SetStateAction<ShoppingCar[]>>;
}

export const ShoppingCarContext = React.createContext<
  ShoppingCarType | undefined
>(undefined);
