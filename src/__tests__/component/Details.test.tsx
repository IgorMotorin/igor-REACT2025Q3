import { render, screen } from '@testing-library/react';
import Details from '../../component/Details';
import { Provider } from 'react-redux';
import { store } from '../../../src/store/store';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});
describe('Details Component Tests', () => {
  it('Displays item name and description correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Details></Details>
        </Provider>
      </NextIntlClientProvider>
    );

    const heading = screen.getAllByRole('heading');
    const paragraph = screen.getAllByRole('paragraph');
    expect(heading[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent('id:');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[0]).toHaveTextContent('');
  });
});
