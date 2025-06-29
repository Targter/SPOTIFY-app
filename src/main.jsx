import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
