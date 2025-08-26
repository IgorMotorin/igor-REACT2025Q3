import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import SelectForm from '../component/SelectForm'; // Укажите правильный путь к компоненту

describe('SelectForm Component', () => {
  test('renders select form with all props', () => {
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={['Вариант 1', 'Вариант 2']}
        label="Тест"
        error={undefined}
      />
    );

    expect(screen.getByLabelText('Тест')).toBeInTheDocument();
    expect(screen.getByText('Выберите значение')).toBeInTheDocument();
  });

  test('renders label correctly', () => {
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={['Вариант 1', 'Вариант 2']}
        label="Тест"
        error={undefined}
      />
    );

    const label = screen.getByLabelText('Тест');
    expect(label).toHaveClass('text-base font-medium text-[#6B7280]');
  });

  test('renders options correctly', () => {
    const options = ['Вариант 1', 'Вариант 2', 'Вариант 3'];
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={options}
        label="Тест"
        error={undefined}
      />
    );

    const select = screen.getByRole('combobox');
    options.forEach((option) => {
      expect(select).toHaveTextContent(option);
    });
  });

  test('renders placeholder correctly', () => {
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={['Вариант 1']}
        label="Тест"
        error={undefined}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
    expect(select).toHaveTextContent('Выберите значение');
  });

  test('renders error message when provided', () => {
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={['Вариант 1']}
        label="Тест"
        error={{ message: 'Обязательное поле' }}
      />
    );

    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
    expect(screen.getByText('Обязательное поле')).toHaveClass('text-red-500');
  });

  test('select value changes correctly', async () => {
    const options = ['Вариант 1', 'Вариант 2'];
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={options}
        label="Тест"
        error={undefined}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['вариант 1']);

    expect(select).toHaveValue('вариант 1');
  });

  test('select is required', () => {
    render(
      <SelectForm
        name="test-select"
        placeholder="Выберите значение"
        options={['Вариант 1']}
        label="Тест"
        error={undefined}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('required', '');
  });
});
