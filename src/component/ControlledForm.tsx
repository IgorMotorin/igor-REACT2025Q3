import { type SubmitHandler, useForm } from 'react-hook-form';
import type { FormFields } from './UncontrolledForm.tsx';
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Country, CountryState } from '../store/countrySlice.tsx';
import { userSchema } from '../validation/userSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { fileToBase64 } from '../function/fileToBase64.tsx';
import { onControlFormChange, onSubmitData } from '../store/checkSlice.tsx';
import { checkStrength } from '../function/checkStrenght.tsx';

export const ControlledForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: yupResolver(userSchema, { abortEarly: false }),
  });
  const passwordValue = watch('password');
  const countryValue = watch('country');
  const [preview, setPreview] = useState<string | null>(null);
  const country = useSelector(
    (state: { countryReducer: CountryState }) => state.countryReducer
  );
  const COUNTRIES = useMemo(
    () => country.map(({ name }: Country) => name),
    [country]
  );

  const dispatch = useDispatch();

  const handleFormSubmit: SubmitHandler<FormFields> = async (data) => {
    const file = data.file;
    const img = await fileToBase64(file);

    const submitDataState = { ...data, file: img };
    dispatch(onSubmitData({ submitDataState }));
    dispatch(onControlFormChange(false));
    setPasswordStrength(null);
  };

  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | null
  >(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPasswordStrength(checkStrength(passwordValue || ''));
  }, [passwordValue]);

  useEffect(() => {
    if (!countryValue) {
      setSuggestions([]);
    } else {
      setSuggestions(
        COUNTRIES.filter((c) =>
          c.toLowerCase().startsWith(countryValue.toLowerCase())
        )
      );
    }
  }, [countryValue, COUNTRIES]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-[480px] bg-white">
        <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="on">
          <div className={'flex flex-row gap-2 '}>
            <div className="mb-3 flex-1">
              <label
                htmlFor={'name'}
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                {'Name'}
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('name')}
                placeholder={'Enter name'}
                id={'name'}
                autoComplete="on"
                aria-invalid={!!errors.name}
              />

              {errors.name && (
                <div role="alert" className="text-red-500 text-xs absolute">
                  {errors.name?.message}
                </div>
              )}
            </div>
            <div className="mb-3 flex-1">
              <label
                htmlFor={'age'}
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                {'Age'}
              </label>
              <input
                type={'number'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('age')}
                placeholder={'Enter age'}
                id={'age'}
                autoComplete="on"
              />

              {errors.age && (
                <div
                  role="alert"
                  className="text-red-500 text-xs absolute max-w-60"
                >
                  {errors.age?.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor={'email'}
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              {'Email'}
            </label>
            <input
              type={'email'}
              id={'email'}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register('email')}
              placeholder={'Enter e-mail'}
              autoComplete="on"
            />
            {errors.email && (
              <div role="alert" className="text-red-500 text-xs absolute">
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className={'flex flex-row gap-2 mb-3'}>
            <div className="mb-3 flex-1">
              <label
                htmlFor={'password'}
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                {'Password'}
              </label>
              <input
                type={'password'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('password')}
                placeholder={'Enter password'}
                id={'password'}
              />

              {errors.password && (
                <div
                  role="alert"
                  className="text-red-500 text-xs absolute w-60"
                >
                  {errors.password?.message}
                </div>
              )}
              {passwordStrength && (
                <div className="mt-4">
                  <div
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
            <div className="mb-3 flex-1">
              <label
                htmlFor={'password-confirm'}
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                {'Password Confirm '}
              </label>

              <input
                type={'password-confirm'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('password-confirm')}
                placeholder={'Enter password confirm'}
                id={'password-confirm'}
              />
              {!!errors['password-confirm'] && (
                <div
                  role="alert"
                  className="text-red-500 text-xs absolute w-60"
                >
                  {errors['password-confirm']?.message}
                </div>
              )}
            </div>
          </div>
          <div className={'flex flex-row gap-2'}>
            <div className="mb-3 flex-1">
              <label
                className="mb-1 block text-base font-medium text-[#07074D] w-full"
                htmlFor="gender"
              >
                Gender:
              </label>
              <select
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('gender')}
                id="gender"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                className="mb-1 block text-base font-medium text-[#07074D] w-full"
                htmlFor="country"
              >
                Country:
              </label>

              <div className="relative">
                <input
                  {...register('country')}
                  placeholder="Enter country"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  id="country"
                  autoComplete="on"
                />

                {errors.country && (
                  <div role="alert" className="text-red-500 text-xs absolute">
                    {errors.country?.message}
                  </div>
                )}
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border rounded-xl mt-1 w-full max-h-40 overflow-y-auto shadow-lg z-10">
                    {suggestions.map((country) => (
                      <li
                        key={country}
                        onClick={() => {
                          setValue('country', country);
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
          </div>

          <div className="mb-3">
            <input
              type="file"
              id="file"
              className="sr-only"
              accept=".jpg,.png,"
              {...register('file')}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <label
              htmlFor="file"
              className=" flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center"
            >
              <div className={'mr-4'}>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-16 h-16 object-cover rounded-xl border"
                  />
                )}
              </div>
              <div>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>

            {errors.file && (
              <div role="alert" className="text-red-500 text-xs absolute">
                {errors.file.message}
              </div>
            )}
          </div>
          <div className={'mb-5'}>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  type="checkbox"
                  aria-describedby="terms"
                  id="terms"
                  {...register('terms')}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            {!!errors.terms && (
              <div role="alert" className="text-red-500 text-xs absolute">
                {errors.terms?.message}
              </div>
            )}
          </div>

          <button
            className={`hover:shadow-form w-full rounded-md ${Object.keys(errors).length > 0 ? 'bg-gray-400' : 'bg-[#6A64F1]'} py-3 px-8 text-center text-base font-semibold text-white outline-none`}
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
