/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "@/app/styles/customStyle.scss";

interface InputProps {
  id?: string;
  name?: string;
  list?: string;
  placeholder?: string;
  type: string;
  onchange?: any;
  onclick?: any;
  value?: any;
  accept?: string;
}

export default function CustomInput({
  id,
  name,
  list,
  placeholder,
  type,
  onchange,
  onclick,
  value,
  accept,
}: InputProps) {
  return (
    <div>
      <input
        autoComplete="off"
        autoCorrect="off"
        autoSave="off"
        className="custom-input"
        id={id}
        name={name}
        list={list}
        type={type}
        placeholder={placeholder}
        onClick={onclick}
        onChange={onchange}
        value={value}
        accept={accept}
      />
    </div>
  );
}
