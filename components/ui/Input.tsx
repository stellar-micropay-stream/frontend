"use client";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-400">{label}</label>
      )}
      <input
        {...props}
        className={`bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 ${error ? "border-red-500" : ""} ${className}`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
