import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const errorHandler = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return '';

  if ('status' in error) {
    const fetchError = error;
    const out = 'Ошибка:' + fetchError.status;
    const data =
      typeof fetchError.data === 'object' && JSON.stringify(fetchError.data);

    return out + ' ' + data;
  }
};
