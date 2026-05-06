import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProductDetail } from "./product-detail/ProductDetail";
import { Home } from "./home/Home";

createRoot(document.getElementById("container") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
