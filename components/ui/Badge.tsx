"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = "default",
  icon,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    danger: "bg-red-100 text-red-700 border border-red-300",
    info: "bg-brandBlue/10 text-brandBlue border border-brandBlue/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </span>
  );
}
