import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import InputPasswordForm, {
  checkStrength,
} from '../component/InputPasswordForm.tsx';

describe('InputPasswordForm Component', () => {
  // Базовый рендер компонента
  test('renders password form with all props', () => {
    render(
      <InputPasswordForm
        name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        error={undefined}
      />
    );

    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument();
  });

  // Проверка работы индикатора прочности пароля
  test('correctly shows password strength', async () => {
    render(
      <InputPasswordForm
        name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Введите пароль');

    // Слабый пароль
    await userEvent.type(input, '123');
    expect(screen.getByText('Слабый пароль')).toBeInTheDocument();
    expect(screen.queryByTestId('strength-bar')).toHaveClass('bg-red-500');

    // Средний пароль
    await userEvent.type(input, 'abc123');
    expect(screen.getByText('Средний пароль')).toBeInTheDocument();
    expect(screen.queryByTestId('strength-bar')).toHaveClass('bg-yellow-500');

    // Сильный пароль
    await userEvent.type(input, 'Abc123@');
    expect(screen.getByText('Сильный пароль')).toBeInTheDocument();
    expect(screen.queryByTestId('strength-bar')).toHaveClass('bg-green-500');
  });

  // Проверка логики определения прочности пароля
  test('correctly calculates password strength', () => {
    expect(checkStrength('')).toBe(null);
    expect(checkStrength('123')).toBe('weak');
    expect(checkStrength('abc123')).toBe('medium');
    expect(checkStrength('Abc123gGfR@')).toBe('strong');
  });

  // Проверка отображения ошибки
  test('renders error message when provided', () => {
    render(
      <InputPasswordForm
        name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        error={{ message: 'Пароль слишком короткий' }}
      />
    );

    expect(screen.getByText('Пароль слишком короткий')).toBeInTheDocument();
    expect(screen.getByText('Пароль слишком короткий')).toHaveClass(
      'text-red-500'
    );
  });

  // Проверка input field
  test('input field has correct attributes', () => {
    render(
      <InputPasswordForm
        name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Введите пароль');
    expect(input).toHaveAttribute('required', '');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toHaveAttribute('id', 'password');
  });

  // Проверка стилей input
  test('input has correct styles', () => {
    render(
      <InputPasswordForm
        name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Введите пароль');
    expect(input).toHaveClass(
      'w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
    );
  });
});
