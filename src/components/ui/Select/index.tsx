import React from "react";

type Option = {
  label: string;
  value: string;
};

type PropTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};
const Select = (props: PropTypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className="flex flex-col m-5">
      <label htmlFor={name} className="block mb-2 text-lg">
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
      >
        {options.map((option) => (
          <option
            value={option.value}
            key={option.label}
            className="p-3 bg-slate-100 mt-1 rounded-md disabled:opacity-70"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
