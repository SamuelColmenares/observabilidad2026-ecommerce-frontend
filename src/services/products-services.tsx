import data from "../data/products.json";
import type { Product } from "../product/Product";

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data.response);
    }, 3000);
  });
};
