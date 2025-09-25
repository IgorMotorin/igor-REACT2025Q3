import { render, screen } from '@testing-library/react';
import Search from '../../component/Search';
import userEvent from '@testing-library/user-event';

describe('component Search Renders', () => {
  it('should Renders search input', () => {
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: 'inputText',
      buttonError: false,
    };
    render(<Search {...searchProp} />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('inputText');

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/поиск/i);
  });
  it('v2 - Displays previously saved search term from localStorage on mount', () => {
    const testText = 'testText';
    localStorage.setItem('appkey', testText);
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: localStorage.getItem('appkey') || '',
      buttonError: false,
    };

    render(<Search {...searchProp} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(testText);
  });
  it('v2 - Shows empty input when no saved term exists', () => {
    localStorage.clear();

    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: localStorage.getItem('appkey') || '',
      buttonError: false,
    };

    render(<Search {...searchProp} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
  it('Triggers search callback with correct parameters', async () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    const searchProp = {
      onChange: onChange,
      onSearch: onClick,
      value: '',
      buttonError: false,
    };
    const app = new Search(searchProp);
    render(app.render());

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/поиск/i);

    const user = userEvent.setup();
    const test = 'ut';
    await user.click(input);
    await user.keyboard(test);

    expect(onChange).toHaveBeenCalledTimes(test.length);

    await user.click(button);
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
  it('Проверка ошибки', async () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    // ожидайте выброс исключения
    expect(() => {
      render(
        <Search
          onChange={onChange}
          onSearch={onSearch}
          value=""
          buttonError={true}
        />
      );
    }).toThrow('I crashed!');
  });
});
