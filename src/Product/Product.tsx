import React from "react";
import styles from "./Product.module.css";
import { Link } from "react-router";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const Product: React.FC<Product> = ({
  id,
  name,
  description,
  price,
}) => {
  return (
    <li className={styles.product}>
      <div className={styles["product__reference-container"]}>
        <img
          className={styles["product__reference"]}
          src={`/assets/no-image.svg`}
          alt={name}
        />
      </div>
      <p className={styles["product__description"]}>{description}</p>
      <span className={styles["product__price"]}>${price.toFixed(2)}</span>
      <button className={styles["product__button-add"]}>Agregar</button>

      <Link to={`/product-detail/${id}`} key={id}>
        <button className={styles["product__button-detail"]}>
          {" "}
          Ver detalles{" "}
        </button>
      </Link>
    </li>
  );
};
