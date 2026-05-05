import React, { use, useEffect } from "react";
import styles from "./App.module.css";
import { ProductList } from "./Product/ProductList";
import { fetchProducts } from "./services/products-services";
import type { Product } from "./Product/Product";

export const App: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [isSearchDirty, setIsSearchDirty] = React.useState(false);

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
            <img
              className={styles.icon}
              src="/assets/logo.svg"
              alt="Logo"
              width="24px"
              height="24px"
            />
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
            <button className={styles["search-button"]}>
              <img
                src="/assets/bell.svg"
                alt="Notificaciones"
                width="24px"
                height="24px"
              />
            </button>
            <button className={styles["search-button"]}>
              <img
                src="/assets/cart-3.svg"
                alt="Carrito"
                width="24px"
                height="24px"
              />
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main + " " + styles.centered}>
        {products.length > 0 && !loading && <ProductList products={products} />}
        {products.length === 0 && !isSearchDirty && (
          <div className={styles["welcome"]}>
            <span className={styles["welcome__message"]}>
              ¡Bienvenido! Explora nuestro catálogo y encuentra productos
              increíbles en segundos.
            </span>
          </div>
        )}
        {products.length === 0 && isSearchDirty && !loading && (
          <div className={styles["no-results-container"]}>
            <img
              src="/assets/detective.svg"
              alt="Detective"
              width="128px"
              height="128px"
            />
            <span className={styles["no-results-message"]}>
              Nada por aquí… ¡pero seguimos buscando contigo!
            </span>
          </div>
        )}
        {loading && (
          <div className={styles["loader-container"]}>
            <span className={styles["loader"]}></span>
            <span className={styles["loader-message"]}>
              Buscando productos...
            </span>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <strong>Observabilidad 2026</strong> - Tech Talk
      </footer>
    </div>
  );
};
