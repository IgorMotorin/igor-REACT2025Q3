import { render, screen, fireEvent } from '@testing-library/react';

import AutocompleteForm from '../component/AutocompleteForm';

describe('AutocompleteForm', () => {
  const options = ['Россия', 'США', 'Германия', 'Франция', 'Китай'];
  const props = {
    name: 'country',
    placeholder: 'Выберите страну',
    options: options,
    label: 'Страна',
    error: undefined,
  };

  test('отображает лейбл и плейсхолдер', () => {
    render(<AutocompleteForm {...props} />);

    expect(screen.getByText('Страна')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Выберите страну')).toBeInTheDocument();
  });

  test('фильтрует предложения при вводе', () => {
    render(<AutocompleteForm {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Рос' } });

    const suggestions = screen.getAllByRole('listitem');
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toHaveTextContent('Россия');
  });

  test('скрывает предложения при пустом вводе', () => {
    render(<AutocompleteForm {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Рос' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('обрабатывает выбор из списка', () => {
    render(<AutocompleteForm {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Гер' } });

    const suggestion = screen.getByText('Германия');
    fireEvent.click(suggestion);

    expect(input).toHaveValue('Германия');
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  test('отображает ошибку при наличии', () => {
    const errorProps = {
      ...props,
      error: { message: 'Страна обязательна' },
    };

    render(<AutocompleteForm {...errorProps} />);

    expect(screen.getByText('Страна обязательна')).toBeInTheDocument();
  });
});
