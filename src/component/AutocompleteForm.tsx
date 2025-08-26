import { useEffect, useState } from 'react';

const AutocompleteForm = ({
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [country, setCountry] = useState<string>('');
  useEffect(() => {
    if (!country) {
      setSuggestions([]);
    } else {
      setSuggestions(
        options.filter((c) => c.toLowerCase().startsWith(country.toLowerCase()))
      );
    }
  }, [country, options]);
  return (
    <div className="mb-3 flex-1">
      <label
        className="mb-1 block text-base font-medium text-[#07074D] w-full"
        htmlFor={name}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          required={true}
          autoComplete="on"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {error && (
          <div role="alert" className="text-red-500 text-xs absolute">
            {error.message}
          </div>
        )}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border rounded-xl mt-1 w-full max-h-40 overflow-y-auto shadow-lg z-10">
            {suggestions.map((country) => (
              <li
                key={country}
                onClick={() => {
                  setCountry(country);
                  setSuggestions([]);
                }}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteForm;
