import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import appRouter from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

// map -->
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
      <ToastContainer stacked />
    </AuthProvider>
  </StrictMode>,
);
