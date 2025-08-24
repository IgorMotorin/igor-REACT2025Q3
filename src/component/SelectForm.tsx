const SelectForm = ({
  name,
  placeholder,
  options,
  label,
  error,
}: {
  name: string;
  placeholder: string;
  options: string[];
  label: string;
  error: { message: string } | undefined;
}) => {
  return (
    <div className="mb-3 flex-1">
      <label
        htmlFor={name}
        className="mb-1 block text-base font-medium text-[#07074D] w-full"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        required
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.toLowerCase()} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      {!!error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};

export default SelectForm;
