import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./components/layout/theme-provider.jsx";
createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system">
  <StrictMode>
    <App />
  </StrictMode>
  </ThemeProvider>
);
