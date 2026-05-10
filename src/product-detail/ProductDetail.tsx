import React, { useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import styles from "./ProductDetail.module.css";
import { useParams } from "react-router";
import { telemetryManager } from "../App";
import { TelemetryAttributes } from "../telemetry/TelemetryAttributes";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const context = React.useContext(ProductsContext);
  if (context === undefined) {
    return undefined;
  }

  const { products } = context;
  const product = products.find((product) => product.id === id);

  useEffect(() => {
        telemetryManager.logInfo(TelemetryAttributes.PRODUCT_DETAIL_VIEWED);
  }, []);

  return (
    <div className={styles["detail-container"]}>
      <div className={styles["detail__reference-container"]}>
        <img
          className={styles["detail__reference"]}
          src={`/assets/no-image.svg`}
          alt={product?.name}
        />
        <button className={styles["detail__buy"]}>Comprar ahora</button>
      </div>
      <section className={styles["detail__info"]}>
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
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
