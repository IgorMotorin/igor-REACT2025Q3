const InputForm = ({
  name,
  placeholder,
  type,
  label,
  error,
}: {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  error: { message: string } | undefined;
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="mb-1 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <input
        required={true}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {!!error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};

export default InputForm;
