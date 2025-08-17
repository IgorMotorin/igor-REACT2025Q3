import { render, screen } from '@testing-library/react';
import Card from '../../component/Card';
import { Provider } from 'react-redux';
import { store } from '../../../src/store/store';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';
import { ThemeContext } from '../../store/Context';

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
describe('Card/Item Component Tests', () => {
  it('Displays item name and description correctly', () => {
    const cardProp = {
      name: 'namecard',
      text: 'textcard',
      page: 1,
      id: 0,
      search: '',
    };
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <ThemeContext value="light">
            <Card {...cardProp}></Card>
          </ThemeContext>
        </Provider>
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByRole('paragraph');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('namecard');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('textcard');
  });

  it('Handles missing props gracefully', () => {
    const cardProp = {
      name: '',
      text: '',
      page: 1,
      id: 0,
      search: '',
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Card {...cardProp}></Card>
        </Provider>
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('');
  });
  it('Displays item name and description correctly', () => {
    const cardProp = {
      name: '1234567890123456789012345678901234567890',
      text: '123456789012345678901234567890123456789012345678901234567890',
      page: 1,
      id: 0,
      search: '',
    };
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Card {...cardProp}></Card>
        </Provider>
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByRole('paragraph');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('12345678901234567890 ...');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(
      '123456789012345678901234567890123456789012345 ...'
    );
  });
});
