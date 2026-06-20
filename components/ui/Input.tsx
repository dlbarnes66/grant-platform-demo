"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Input */}
      <input
        className={cn(
          "px-4 py-2 rounded-lg border text-gray-800 bg-white shadow-sm transition focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-brandBlue/40 focus:border-brandBlue",
          className
        )}
        {...props}
      />

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Helper Text */}
      {!error && helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
