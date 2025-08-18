import { render, screen } from '@testing-library/react';
import Popup from '../../component/Popup';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import type { useSelector as OriginalUseSelector } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

type Author = { name: string };
type Book = { id: number; title: string; authors: Author[] };

type MockedState = {
  [key: number]: Book;
};

export const mockedState: MockedState = {
  1: { id: 1, title: '', authors: [{ name: 'name' }] },
  2: { id: 2, title: '', authors: [{ name: 'name' }] },
};

vi.mock<typeof import('react-redux')>(
  import('react-redux'),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useSelector: (() => mockedState) as unknown as typeof OriginalUseSelector,
    };
  }
);

describe('Popup Component Tests', () => {
  it('Displays item name and description correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Popup></Popup>
        </Provider>
      </NextIntlClientProvider>
    );

    const listitem = screen.getAllByRole('listitem');
    expect(listitem[0]).toBeInTheDocument();
    expect(listitem[0]).toHaveTextContent('id: 1');

    const input = screen.getAllByRole('checkbox');
    expect(input[1]).toBeInTheDocument();
    expect(input[1]).toBeChecked();
  });

  it('Displays item name and description correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Popup></Popup>
        </Provider>
      </NextIntlClientProvider>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const button = screen.getByRole('link', { name: 'Download CSV' });

    expect(button).toBeInTheDocument();
  });
});

describe('user interaction', async () => {
  it('should', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Provider store={store}>
          <Popup></Popup>
        </Provider>
      </NextIntlClientProvider>
    );

    const list = screen.getAllByRole('checkbox');
    expect(list[0]).toBeInTheDocument();
    expect(list[1]).toBeInTheDocument();

    expect(list[0]).toBeChecked();
    expect(list[1]).toBeChecked();

    const button = screen.getByRole('button', { name: 'Unselect all' });

    expect(button).toBeInTheDocument();
  });
});
