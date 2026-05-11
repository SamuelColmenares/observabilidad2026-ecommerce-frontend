import React, { use, useEffect, useMemo } from "react";
import styles from "./App.module.css";
import { fetchProducts } from "./services/products-services";
import type { Product } from "./product/Product";
import { Link, Outlet } from "react-router";
import { ProductsContext, ShoppingCarContext } from "./context/ProductsContext";
import { SeverityNumber, logs } from "@opentelemetry/api-logs";
import { TelemetryAttributes } from "./telemetry/TelemetryAttributes";
import { TelemetryManager } from "./telemetry/Telemetry";
import type { ShoppingCar } from "./shopping-car/shopping-car";
import { telemetryManager } from ".";

export const App: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [isSearchDirty, setIsSearchDirty] = React.useState(false);
  const [shoppingCar, setShoppingCar] = React.useState<ShoppingCar[]>([]);

  useEffect(() => {
    telemetryManager.logInfo(TelemetryAttributes.APP_INITIALIZED);
  }, []);

  const onSearchEvent = async () => {
    telemetryManager.logInfo(
      TelemetryAttributes.USER_SEARCHED_PRODUCTS_VIEWED + " " + search,
    );
    setIsSearchDirty(true);
    setLoading(true);
    const response = await fetchProducts();
    setProducts(
      response.filter((product) =>
        product.name.toLowerCase().includes(search ? search.toLowerCase() : ""),
      ),
    );
    setLoading(false);
  };

  const shoppingMemo = useMemo(() => {
    return { shoppingCar, setShoppingCar };
  }, [shoppingCar]);

  return (
    <ShoppingCarContext.Provider value={shoppingMemo}>
      <ProductsContext.Provider
        value={{ products, loading, isSearchDirty, setProducts }}
      >
        <div className={styles.root}>
          <header className={styles.header}>
            <div
              className={
                styles.centered +
                " " +
                styles["row"] +
                " " +
                styles["row-between"] +
                " " +
                styles["row-vertical-centered"]
              }
            >
              <div
                className={
                  styles["row"] + " " + styles["row-vertical-centered"]
                }
              >
                <Link to={`/`}>
                  <img
                    className={styles.icon}
                    src="/assets/logo.svg"
                    alt="Logo"
                    width="24px"
                    height="24px"
                  />
                </Link>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Buscar productos..."
                  className={styles["search-input"]}
                />
                <button
                  className={styles["search-products"]}
                  onClick={onSearchEvent}
                >
                  <img
                    src="/assets/search.svg"
                    alt="Buscar"
                    width="24px"
                    height="24px"
                  />
                </button>
              </div>
              <div className={styles.menu}>
                <div className={styles["search-button-container"]}>
                  <Link
                    to={`/notifications`}
                    className={styles["product__button-detail-container"]}
                  >
                    <button className={styles["search-button"]}>
                      <img
                        src="/assets/bell.svg"
                        alt="Notificaciones"
                        width="24px"
                        height="24px"
                      />
                    </button>
                  </Link>
                  <span className={styles["search-button-text"]}>
                    Notificaciones
                  </span>
                </div>
                <div className={styles["search-button-container"]}>
                  <Link
                    to={`/shopping-car`}
                    className={styles["product__button-detail-container"]}
                  >
                    <button className={styles["search-button"]}>
                      <img
                        src="/assets/cart-3.svg"
                        alt="Carrito"
                        width="24px"
                        height="24px"
                      />
                    </button>
                  </Link>
                  <span className={styles["search-button-text"]}>
                    Carrito &nbsp;
                    {shoppingCar.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className={styles.main + " " + styles.centered}>
            <Outlet />
          </main>
          <footer className={styles.footer}>
            <strong>Observabilidad 2026</strong> - Tech Talk
          </footer>
        </div>
      </ProductsContext.Provider>
    </ShoppingCarContext.Provider>
  );
};
