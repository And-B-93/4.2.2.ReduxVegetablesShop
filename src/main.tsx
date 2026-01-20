import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../src/components/App/App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { setupStore } from "../src/components/store/store.ts";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
);
