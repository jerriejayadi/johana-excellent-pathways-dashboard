import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className={`flex flex-col`}>
      {label && (
        <label htmlFor={props.id} className={`mb-2 `}>
          {label}
        </label>
      )}
      <div
        className={`${
          props.className ?? ""
        } w-full bg-inherit px-4 py-3 border border-dark-border rounded-lg focus-within:border-gray-500`}
      >
        <input
          {...props}
          id={props.id}
          placeholder={props.placeholder}
          type={props.type}
          className={`w-full bg-inherit focus:outline-none`}
        />
      </div>
    </div>
  );
}
