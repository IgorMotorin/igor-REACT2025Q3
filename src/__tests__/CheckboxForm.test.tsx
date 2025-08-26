import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxForm from '../component/CheckboxForm';

describe('CheckboxForm component', () => {
  test('отображает чекбокс и текст по умолчанию', () => {
    render(<CheckboxForm error={undefined} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
    expect(screen.queryByText(/text-red-500/i)).not.toBeInTheDocument();
  });

  test('проверяет состояние чекбокса', () => {
    render(<CheckboxForm error={undefined} />);

    const checkbox: HTMLInputElement = screen.getByRole('checkbox');

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  test('отображает ошибку при наличии', () => {
    const errorMessage = 'You must accept the terms and conditions';
    render(<CheckboxForm error={{ message: errorMessage }} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });

  test('проверяет работу ссылки Terms and Conditions', () => {
    render(<CheckboxForm error={undefined} />);

    const link = screen.getByRole('link', { name: /Terms and Conditions/i });

    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveClass('font-medium text-primary-600');
  });

  test('проверяет атрибуты чекбокса', () => {
    render(<CheckboxForm error={undefined} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('id', 'terms');
    expect(checkbox).toHaveAttribute('aria-describedby', 'terms');
    expect(checkbox).toHaveAttribute('required', '');
  });
});
