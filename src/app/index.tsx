import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { onLCP, onINP, onCLS } from "web-vitals";

import { CartProvider } from "@/features/cart/context/CartContext";
import { store } from "@/store";
import App from "./App";
import "@/styles/global.scss";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>,
);

function reportVital(metric: { name: string; value: number; rating: string }) {
  // eslint-disable-next-line no-console
  console.log(`[${metric.name}] ${metric.value.toFixed(1)}ms (${metric.rating})`);
}

onLCP(reportVital);
onINP(reportVital);
onCLS(reportVital);
