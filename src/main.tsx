import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
  registerSW({
    onRegistered(registration) {
      console.log("Service Worker registered");
    },
    onRegisterError(error) {
      console.error("Service Worker registration failed:", error);
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
