import { mixed, number, object, string } from 'yup';

export const passwordChecklist = new Map([
  [/\d/, '1 number'],
  [/[A-ZА-Я]/, '1 uppercased'],
  [/[a-zа-я]/, '1 lowercased'],
  [/[!"№;%:?*()@#$^&.,~`{}<>'_\-+=[/|\\\]]/, '1 special'],
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const userSchema = object().shape({
  name: string()
    .matches(/^([A-ZА-Я])/, { message: 'first uppercased letter' })
    .required('required'),
  age: number().positive('positive number').integer().required('required'),
  email: string()
    .email()
    .matches(/^.+@.+\..+$/i, { message: 'valid email' })
    .required('required'),
  password: string()
    .defined()
    .test((value, ctx) => {
      const messages: string[] = [];

      passwordChecklist.forEach((message, regex) => {
        if (!regex.test(value)) {
          messages.push(message);
        }
      });

      if (ctx.path.endsWith('-confirm')) {
        const originalPath = ctx.path.replace(/-confirm$/, '');
        if (isObject(ctx.parent) && ctx.parent[originalPath] !== value) {
          messages.push('must match');
        }
      }

      return messages.length > 0
        ? ctx.createError({ message: messages.join(', ') })
        : true;
    })
    .required('required'),
  'password-confirm': string()
    .defined()
    .test((value, ctx) => {
      const messages: string[] = [];

      passwordChecklist.forEach((message, regex) => {
        if (!regex.test(value)) {
          messages.push(message);
        }
      });

      if (ctx.path.endsWith('-confirm')) {
        const originalPath = ctx.path.replace(/-confirm$/, '');
        if (isObject(ctx.parent) && ctx.parent[originalPath] !== value) {
          messages.push('must match');
        }
      }

      return messages.length > 0
        ? ctx.createError({ message: messages.join(', ') })
        : true;
    })
    .required('required'),
  gender: string().typeError('should be a string').required('required'),
  country: string().typeError('should be a string').required('required'),
  file: mixed((input): input is File => input instanceof File)
    .transform((value) => {
      if (value instanceof File) {
        return value;
      }
      if (value instanceof FileList) {
        return value.item(0);
      }
      throw new Error('unexpected filetype');
    })
    .defined()
    .test((file, ctx) => {
      const messages: string[] = [];

      const { name, size } = file;

      if (!['jpg', 'png'].includes(name.slice(name.lastIndexOf('.') + 1))) {
        messages.push('should be jpg or png');
      }

      if (size > 1000000) {
        messages.push('should be less than 1000000 bytes');
      }

      return messages.length > 0
        ? ctx.createError({ message: messages.join(', ') })
        : true;
    })
    .required('required'),
  terms: string()
    .transform((value: string) => (value === 'on' ? 'true' : value))
    .matches(/true/i, { message: 'should be enabled' })
    .required('required'),
});
