import { errorHandler } from '../../function/errorHandler';

describe('group', () => {
  it('should', () => {
    const newError = {
      status: 'FETCH_ERROR',
      data: { info: 'FETCH_ERROR' },
    };
    const out = errorHandler(newError);
    expect(out).toBe('Ошибка:FETCH_ERROR {"info":"FETCH_ERROR"}');
  });
});
