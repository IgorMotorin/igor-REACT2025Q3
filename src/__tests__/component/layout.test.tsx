import { act, render } from '@testing-library/react';
import LocaleLayout from '../../app/[locale]/layout';
import { describe, it } from 'vitest';

describe('layout ui test', () => {
  it('should', async () => {
    const child = <p>child</p>;

    const myPromise = new Promise<{ locale: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          locale: 'en',
        });
      }, 1000);
    });

    await act(async () => {
      render(<LocaleLayout params={myPromise}>{child}</LocaleLayout>, {
        container: document,
      });
    });
  });
});
