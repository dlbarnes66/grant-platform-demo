"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  border?: boolean;
}

export default function Card({
  children,
  className,
  shadow = true,
  border = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6",
        shadow && "shadow-sm",
        border && "border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* Optional Subcomponents */

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 pb-3 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 pt-3 border-t border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}
