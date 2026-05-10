import React, { useEffect } from "react";
import {
  ProductsContext,
  ShoppingCarContext,
} from "../context/ProductsContext";
import styles from "./ProductDetail.module.css";
import { useParams } from "react-router";
import { TelemetryAttributes } from "../telemetry/TelemetryAttributes";

import { telemetryManager } from "..";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const context = React.useContext(ProductsContext);
  const shoppingCarContext = React.useContext(ShoppingCarContext);
  if (context === undefined) {
    return undefined;
  }

  const { products } = context;
  const product = products.find((product) => product.id === id);

  if (!product || !id) {
    return undefined;
  }

  useEffect(() => {
    telemetryManager.logInfo(
      TelemetryAttributes.PRODUCT_DETAIL_VIEWED + " " + product?.name,
    );
  }, []);

  return (
    <div className={styles["detail-container"]}>
      <div className={styles["detail__reference-container"]}>
        <img
          className={styles["detail__reference"]}
          src={`/assets/no-image.svg`}
          alt={product?.name}
        />
        <button
          className={styles["detail__buy"]}
          onClick={() => {
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
          }}
        >
          Agregar al carrito
        </button>
      </div>
      <section className={styles["detail__info"]}>
        <h2>{product?.name}</h2>
        <p className={styles["detail--limit"]}>{product?.description}</p>
        <p className={styles["detail__info-price"]}>
          <span>COP</span>&nbsp;{product?.price?.toFixed(2)}
        </p>
        <div className={styles["detail__info-pills"]}>
          <span className={styles["gray-pill"]}>Nuevo</span>
          <span className={styles["payment-pill"]}>15% con Davibank</span>
        </div>
      </section>
    </div>
  );
};
