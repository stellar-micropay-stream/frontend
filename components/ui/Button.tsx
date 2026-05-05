"use client";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-gray-100",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export function Button({
  variant = "primary",
  loading,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}
