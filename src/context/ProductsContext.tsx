import React from "react";
import type { Product } from "../product/Product";

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  isSearchDirty: boolean;
  setProducts: (products: Product[]) => void;
}

export const ProductsContext = React.createContext<
  ProductsContextType | undefined
>(undefined);
