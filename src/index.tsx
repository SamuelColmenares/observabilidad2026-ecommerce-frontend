import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProductDetail } from "./product-detail/ProductDetail";
import { Home } from "./home/Home";
import { ShoppingCar } from "./shopping-car/shopping-car";
import { TelemetryManager } from "./telemetry/Telemetry";

export const telemetryManager = new TelemetryManager({
  url: "http://172.26.190.162:3005/v1/logs", // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 10, // an optional limit on pending requests
});

createRoot(document.getElementById("container") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="shopping-car" element={<ShoppingCar />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
