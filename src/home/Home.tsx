import React from "react";
import styles from "./Home.module.css";
import { ProductList } from "../product/ProductList";
import { ProductsContext } from "../context/ProductsContext";

export const Home: React.FC = () => {
  const context = React.useContext(ProductsContext);
  if (context === undefined) {
    return undefined;
  }

  const { products, loading, isSearchDirty } = context;

  return (
    <>
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
    </>
  );
};
