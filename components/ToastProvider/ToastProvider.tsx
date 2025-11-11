"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 4000,
          style: {
            background: "#10B981",
            color: "#fff",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        },
        style: {
          padding: "16px",
          borderRadius: "8px",
          fontSize: "14px",
        },
      }}
    />
  );
}