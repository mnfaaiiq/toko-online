import React from "react";

type PropTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropTypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col my-5">
      {label ?? <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className="p-3 bg-slate-100 mt-1 rounded-md disabled:opacity-70"
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
