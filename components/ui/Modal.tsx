"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  width = "md",
}: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative bg-white rounded-xl shadow-xl p-6 z-50 animate-scaleIn w-full",
          widths[width]
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 className="text-xl font-bold text-brandBlue">{title}</h2>
            )}
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-brandBlue transition"
          aria-label="Close modal"
        >
          <span className="material-icons text-2xl">close</span>
        </button>
      </div>
    </div>
  );
}
