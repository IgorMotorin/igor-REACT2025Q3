import InputForm from './InputForm.tsx';
import SelectForm from './SelectForm.tsx';
import FileForm from './FileForm.tsx';
import CheckboxForm from './CheckboxForm.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { CountryState } from '../store/countrySlice.tsx';
import { useState } from 'react';
import { userSchema } from '../validation/userSchema.tsx';
import { ValidationError } from 'yup';
import { fileToBase64 } from '../function/fileToBase64.tsx';
import { onSubmitData, onUncontrolFormChange } from '../store/checkSlice.tsx';

interface ErrorMessage {
  message: string;
}
interface ErrorList {
  name?: ErrorMessage;
  age?: ErrorMessage;
  email?: ErrorMessage;
  password?: ErrorMessage;
  'password-confirm'?: ErrorMessage;
  gender?: ErrorMessage;
  terms?: ErrorMessage;
  file?: ErrorMessage;
  country?: ErrorMessage;
}

export interface FormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  'password-confirm': string;
  gender: string;
  terms: string;
  file: File;
  country: string;
}
export interface FormFieldsState {
  name: string;
  age: number;
  email: string;
  password: string;
  'password-confirm': string;
  gender: string;
  terms: string;
  file: string;
  country: string;
}
const UncontrolledForm = () => {
  const [errors, setErrors] = useState<ErrorList>({});
  const dispatch = useDispatch();
  const country = useSelector(
    (state: { countryReducer: CountryState }) => state.countryReducer
  );
  const arrCountry = country.map((country) => country.name);

  const validateForm = async (
    form: FormData
  ): Promise<{ errors: ErrorList } | { submitData: FormFields }> => {
    try {
      const submitData = await userSchema.validate(
        Object.fromEntries(form.entries()),
        { abortEarly: false }
      );
      return { submitData };
    } catch (e) {
      if (e instanceof ValidationError) {
        const submitErrors = e.inner.reduce<ErrorList>(
          (acc, { path, message }) =>
            path ? { ...acc, [path]: { message } } : acc,
          {}
        );
        return { errors: submitErrors };
      }
      throw e;
    }
  };

  const handleAction:
    | string
    | ((formData: FormData) => void | Promise<void>)
    | undefined = (form) => {
    validateForm(form)
      .then(async (result) => {
        if ('errors' in result) {
          setErrors(result.errors);
        } else {
          setErrors({});
        }
        if ('submitData' in result) {
          const { submitData } = result;

          const img = await fileToBase64(submitData.file);

          const submitDataState = { ...submitData, file: img };
          dispatch(onSubmitData({ submitDataState }));
          dispatch(onUncontrolFormChange(false));
        }
      })
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-[850px] bg-white">
        <form action={handleAction} autoComplete="on">
          <div className={'flex flex-row gap-2'}>
            <InputForm
              name="name"
              placeholder={'Enter name'}
              type={'text'}
              label={'Name'}
              error={errors.name}
            ></InputForm>
            <InputForm
              name="age"
              placeholder={'Enter age'}
              type={'text'}
              label={'Age'}
              error={errors.age}
            ></InputForm>
          </div>
          <InputForm
            name="email"
            placeholder={'Enter email'}
            type={'email'}
            label={'Email Address'}
            error={errors.email}
          ></InputForm>

          <div className={'flex flex-row gap-2'}>
            <InputForm
              name="password"
              placeholder={'••••••••'}
              type={'password'}
              label={'Password'}
              error={errors.password}
            ></InputForm>
            <InputForm
              name="password-confirm"
              placeholder={'••••••••'}
              type={'password'}
              label={'Confirm Password'}
              error={errors['password-confirm']}
            ></InputForm>
          </div>

          <div className={'flex flex-row gap-2'}>
            <SelectForm
              name={'gender'}
              placeholder={'Select gender'}
              label={'Gender'}
              options={['Male', 'Female']}
              error={errors.gender}
            ></SelectForm>
            <SelectForm
              name={'country'}
              placeholder={'Select country'}
              label={'Country'}
              options={arrCountry}
              error={errors.country}
            ></SelectForm>
          </div>
          <FileForm error={errors.file}></FileForm>
          <CheckboxForm error={errors.terms}></CheckboxForm>

          <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UncontrolledForm;
