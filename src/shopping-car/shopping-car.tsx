import React, { useEffect } from "react";
import styles from "./shopping-car.module.css";
import type { Product } from "../product/Product";
import { ShoppingCarContext } from "../context/ProductsContext";
import { TelemetryAttributes } from "../telemetry/TelemetryAttributes";
import { telemetryManager } from "..";

export interface ShoppingCar {
  product: Product;
  quantity: number;
}

export const ShoppingCar: React.FC = () => {
  const shoppingCar = React.useContext(ShoppingCarContext);

  if (shoppingCar === undefined || shoppingCar.shoppingCar.length === 0) {
    return (
      <div className={styles["shopping-message-container"]}>
        <span className={styles["shopping-message"]}>
          Tu carrito de compra esta vacio.
        </span>
      </div>
    );
  }

  return (
    <div
      className={
        styles["shopping-container"] + " " + styles["shopping--centered"]
      }
    >
      <ul className={styles["shopping-items"]}>
        {shoppingCar?.shoppingCar.map((item) => (
          <li className={styles["shopping-item"]}>
            <div>
              <img
                src="/assets/no-image.svg"
                alt="Producto 1"
                width="64px"
                height="64px"
              />
            </div>
            <div className={styles["shopping-item-details"]}>
              <div>
                <strong>{item.product.name}</strong>&nbsp;
                <span className={styles["shopping-item-details-quantity"]}>
                  {item.quantity} units
                </span>
              </div>
              <div>
                <span className={styles["shopping-item-details-price"]}>
                  COP&nbsp;{item.product.price?.toFixed(2) ?? "0.00"}
                </span>
              </div>
            </div>
          </li>
        ))}

        <li className={styles["shopping-item"]}>
          <span>
            Total COP:{" "}
            {shoppingCar?.shoppingCar
              .reduce(
                (total, item) =>
                  total + (item.product.price ?? 0) * item.quantity,
                0,
              )
              .toFixed(2)}
          </span>
        </li>
      </ul>
    </div>
  );
};
