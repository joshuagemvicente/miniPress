import React from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
}

export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
}: InputProps) {
  return (
    <div className="flex flex-col gap-3 m-3">
      {label && <label htmlFor="">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border"
      />
    </div>
  );
}
