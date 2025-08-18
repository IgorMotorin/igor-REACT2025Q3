import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { errorHandler } from '../../function/errorHandler';
import { describe, expect, it } from 'vitest';

describe('group', () => {
  it('should', () => {
    const newError: FetchBaseQueryError = {
      status: 'CUSTOM_ERROR',
      data: { info: 'CUSTOM_ERROR' },
      error: 'string',
    };
    const out = errorHandler(newError);
    expect(out).toBe('Ошибка:CUSTOM_ERROR {"info":"CUSTOM_ERROR"}');
  });
});
