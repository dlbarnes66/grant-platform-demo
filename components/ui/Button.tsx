"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brandBlue text-white hover:bg-brandGold hover:text-black",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline:
      "border border-brandBlue text-brandBlue hover:bg-brandBlue hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
}
