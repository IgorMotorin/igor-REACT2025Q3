import { type SubmitHandler, useForm } from 'react-hook-form';
import type { FormFields } from './UncontrolledForm.tsx';
import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { CountryState } from '../store/countrySlice.tsx';
import { userSchema } from '../validation/userSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { fileToBase64 } from '../function/fileToBase64.tsx';
import { onControlFormChange, onSubmitData } from '../store/checkSlice.tsx';

export const ControlledForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: yupResolver(userSchema, { abortEarly: false }),
  });

  const country = useSelector(
    (state: { countryReducer: CountryState }) => state.countryReducer
  );
  const dispatch = useDispatch();

  const handleFormSubmit: SubmitHandler<FormFields> = async (data) => {
    const file = data.file;
    const img = await fileToBase64(file);

    const submitDataState = { ...data, file: img };
    dispatch(onSubmitData({ submitDataState }));
    dispatch(onControlFormChange(false));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-[480px] bg-white">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={'flex flex-row gap-2 '}>
            <div className="mb-3 flex-1">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                {'Name'}
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('name')}
                placeholder={'Enter name'}
              />
              <span className="text-red-500 text-xs">
                {errors.name?.message || ' '}
              </span>
            </div>
            <div className="mb-3 flex-1">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                {'Age'}
              </label>
              <input
                type={'number'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('age')}
                placeholder={'Enter age'}
              />

              <span className="text-red-500 text-xs ">
                {errors.age?.message}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-1 block text-base font-medium text-[#07074D]">
              {'Email'}
            </label>
            <input
              type={'email'}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register('email')}
              placeholder={'Enter e-mail'}
            />

            <span className="text-red-500 text-xs">
              {errors.email?.message}
            </span>
          </div>
          <div className={'flex flex-row gap-2'}>
            <div className="mb-3 flex-1">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                {'Password'}
              </label>
              <input
                type={'password'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('password')}
                placeholder={'Enter password'}
              />

              <span className="text-red-500 text-xs">
                {errors.password?.message}
              </span>
            </div>
            <div className="mb-3 flex-1">
              <label className="mb-1 block text-base font-medium text-[#07074D]">
                {'Password Confirm '}
              </label>
              <input
                type={'password-confirm'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('password-confirm')}
                placeholder={'Enter password confirm'}
              />
              {!!errors['password-confirm'] && (
                <span className="text-red-500 text-xs">
                  {errors['password-confirm']?.message}
                </span>
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
              <select
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register('country')}
                id="country"
              >
                <option value="">Select country</option>
                {country.map(({ name }) => (
                  <option value={name} key={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="file"
              id="file"
              className="sr-only"
              accept=".jpg,.png,"
              {...register('file')}
            />
            <label
              htmlFor="file"
              className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center"
            >
              <div>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>

            {!!errors.file && (
              <span className="text-red-500 text-xs flex flex-wrap">
                {errors.file.message}
              </span>
            )}
          </div>
          <div className={'mb-3'}>
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
              <span className="text-red-500 text-xs flex flex-wrap">
                {errors.terms.message}
              </span>
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
