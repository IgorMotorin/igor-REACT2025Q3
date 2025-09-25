import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { describe, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App.tsx';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  http.get('https://catfact.ninja/facts?max_length=100&limit=100', () => {
    return HttpResponse.json({
      data: [
        { fact: 'Cats can jump up to six times their height.' },
        {
          fact: 'Dogs have wet noses because they help regulate body temperature.',
        },
      ],
    });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('App', () => {
  test('renders loading indicator when fetching data', async () => {
    render(<App />);

    // Проверяем наличие спиннера при начальной загрузке
    expect(screen.queryByTestId('spinner')).not.toBeNull();

    // Ждём окончания сетевого запроса
    await waitFor(() => expect(screen.queryByTestId('spinner')).toBeNull());
  });

  test('displays filtered results after searching', async () => {
    render(<App />);

    // Эмулируем ввод в поле поиска
    const inputField = screen.getByRole('searchbox');
    await userEvent.type(inputField, 'cats');

    // Нажимаем кнопку поиска
    const searchButton = screen.getByRole('button', { name: /поиск/i });
    await userEvent.click(searchButton);

    // Ожидаем завершение запроса и появление карточки результата
    await waitFor(() =>
      expect(
        screen.getByText(/Cats can jump up to six times their height./)
      ).toBeInTheDocument()
    );
  });

  test('handles empty search result', async () => {
    server.use(
      http.get('https://catfact.ninja/facts?max_length=100&limit=100', () => {
        return HttpResponse.json({
          data: [],
        });
      })
    );

    render(<App />);

    const inputField = screen.getByRole('searchbox');
    await userEvent.type(inputField, 'unicorns');

    const searchButton = screen.getByRole('button', { name: /поиск/i });
    await userEvent.click(searchButton);
    const result = screen.queryAllByText(/no result/i);
    await waitFor(() => expect(result[0]).toBeInTheDocument());
  });

  test('shows an error message when request fails', async () => {
    server.use(
      http.get('https://catfact.ninja/facts?max_length=100&limit=100', () => {
        return new HttpResponse('Hello world', { status: 500 });
      })
    );

    render(<App />);

    const inputField = screen.getByRole('searchbox');
    await userEvent.type(inputField, 'any');

    const searchButton = screen.getByRole('button', { name: /поиск/i });
    await userEvent.click(searchButton);

    await waitFor(() =>
      expect(screen.getByText(/Ошибка связи/i)).toBeInTheDocument()
    );
  });
});
