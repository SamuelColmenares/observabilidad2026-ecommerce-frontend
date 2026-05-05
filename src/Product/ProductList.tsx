import React from "react";
import { ProductItem } from "./Product";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: any[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles["product-list"]}>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};
