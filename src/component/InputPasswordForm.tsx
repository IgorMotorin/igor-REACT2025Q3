import { useState } from 'react';
import { checkStrength } from '../function/checkStrenght.tsx';

const InputPasswordForm = ({
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
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | null
  >(null);

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="mb-1 block text-base font-medium text-[#07074D]"
      >
        {label}
      </label>
      <input
        onChange={(e) => setPasswordStrength(checkStrength(e.target.value))}
        required={true}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {!!error && (
        <div className="text-red-500 text-xs absolute w-60">
          {error.message}
        </div>
      )}
      {passwordStrength && (
        <div className="mt-6">
          <div
            data-testid="strength-bar"
            className={`h-2 rounded-xl ${
              passwordStrength === 'weak'
                ? 'bg-red-500 w-1/3'
                : passwordStrength === 'medium'
                  ? 'bg-yellow-500 w-2/3'
                  : 'bg-green-500 w-full'
            }`}
          />
          <p
            className={`text-sm mt-1 ${
              passwordStrength === 'weak'
                ? 'text-red-600'
                : passwordStrength === 'medium'
                  ? 'text-yellow-600'
                  : 'text-green-600'
            }`}
          >
            {passwordStrength === 'weak'
              ? 'Слабый пароль'
              : passwordStrength === 'medium'
                ? 'Средний пароль'
                : 'Сильный пароль'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputPasswordForm;
