import type { ToastOptions } from "react-toastify";

export const processOpts: ToastOptions = {
  position: "top-right",
  autoClose: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  closeOnClick: false,
  hideProgressBar: true,
  closeButton: false,
  type: "info",
  theme: "dark",
  // @ts-expect-error draggable property exists but may not be properly typed
  draggable: !import.meta.PROD,
  isLoading: true,
};

export const successOpts: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  closeOnClick: true,
  hideProgressBar: false,
  closeButton: false,
  theme: "colored",
  type: "success",
  draggable: true,
  isLoading: false,
};

export const errorOpts: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  closeOnClick: false,
  hideProgressBar: false,
  closeButton: false,
  theme: "colored",
  type: "error",
  // @ts-expect-error draggable property exists but may not be properly typed
  draggable: !import.meta?.PROD,
  isLoading: false,
};

export const warningOpts: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  closeOnClick: true,
  hideProgressBar: false,
  closeButton: false,
  theme: "colored",
  type: "warning",
  draggable: true,
  isLoading: false,
};
