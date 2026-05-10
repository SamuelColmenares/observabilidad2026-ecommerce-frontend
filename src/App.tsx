import React, { use, useEffect } from "react";
import styles from "./App.module.css";
import { fetchProducts } from "./services/products-services";
import type { Product } from "./product/Product";
import { Link, Outlet } from "react-router";
import { ProductsContext } from "./context/ProductsContext";
import { SeverityNumber, logs } from "@opentelemetry/api-logs";
import { TelemetryAttributes } from "./telemetry/TelemetryAttributes";
import { TelemetryManager } from "./telemetry/Telemetry";

export const telemetryManager = new TelemetryManager({
  url: "http://172.26.190.162:3005/v1/logs", // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 10, // an optional limit on pending requests
});

export const App: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [isSearchDirty, setIsSearchDirty] = React.useState(false);

  useEffect(() => {
    telemetryManager.logInfo(TelemetryAttributes.APP_INITIALIZED);
  }, []);

  const onSearchEvent = async () => {
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

  return (
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
              className={styles["row"] + " " + styles["row-vertical-centered"]}
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
                <button className={styles["search-button"]}>
                  <img
                    src="/assets/bell.svg"
                    alt="Notificaciones"
                    width="24px"
                    height="24px"
                  />
                </button>
                <span className={styles["search-button-text"]}>
                  Notificaciones
                </span>
              </div>
              <div className={styles["search-button-container"]}>
                <button className={styles["search-button"]}>
                  <img
                    src="/assets/cart-3.svg"
                    alt="Carrito"
                    width="24px"
                    height="24px"
                  />
                </button>
                <span className={styles["search-button-text"]}>Carrito</span>
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
  );
};
