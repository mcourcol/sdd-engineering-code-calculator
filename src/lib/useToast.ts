"use client";

import { useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  duration?: number;
}

export function useToast() {
  const showToast = useCallback(
    (message: string, type: ToastType = "info", options: ToastOptions = {}) => {
      const { duration = 3000 } = options;

      const toast = document.createElement("div");
      toast.className = "toast toast-top toast-center";
      toast.innerHTML = `
        <div class="alert alert-${type}">
          <span>${message}</span>
        </div>
      `;

      document.body.appendChild(toast);

      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, duration);
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast(message, "success", options);
    },
    [showToast],
  );

  const showError = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast(message, "error", options);
    },
    [showToast],
  );

  const showInfo = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast(message, "info", options);
    },
    [showToast],
  );

  const showWarning = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast(message, "warning", options);
    },
    [showToast],
  );

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
