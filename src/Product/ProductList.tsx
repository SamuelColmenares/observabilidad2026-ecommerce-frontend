import React from "react";
import { Product } from "./Product";
import styles from "./ProductList.module.css";
import { Link } from "react-router";
import { ShoppingCarContext } from "../context/ProductsContext";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const shoppingCarContext = React.useContext(ShoppingCarContext);
  const onAddToCar = (id: string) => {
    shoppingCarContext?.setShoppingCar((prev) => {
      let prod = products.find((product) => product.id === id);
      let oldProd = prev.find((product) => product.product.id === id);
      if (!prod) return prev;
      if (!oldProd) {
        let quan = prev?.find((p) => p.product.id == id)?.quantity ?? 0;
        return [...prev, { product: prod, quantity: 1 }];
      }

      return prev.map((product) => {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      });
    });
  };

  return (
    <ul className={styles["product-list"]}>
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToCar={onAddToCar} />
      ))}
    </ul>
  );
};
