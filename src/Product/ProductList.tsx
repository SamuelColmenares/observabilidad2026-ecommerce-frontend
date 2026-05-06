import React from "react";
import { Product } from "./Product";
import styles from "./ProductList.module.css";
import { Link } from "react-router";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles["product-list"]}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  );
};
