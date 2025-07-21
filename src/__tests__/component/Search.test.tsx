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
  });

  it('should Renders search button', () => {
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: 'inputText',
      buttonError: false,
    };
    render(<Search {...searchProp} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/поиск/i);
  });

  it('v2 - Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('appkey', 'local');
    const searchProp = {
      onChange: () => {},
      onSearch: () => {},
      value: localStorage.getItem('appkey') || '',
      buttonError: false,
    };

    render(<Search {...searchProp} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('local');
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
    const searchProp = {
      onChange: vi.fn(),
      onSearch: () => {},
      value: '',
      buttonError: false,
    };
    const app = new Search(searchProp);
    render(app.render());

    const input = screen.getByRole('searchbox');

    const user = userEvent.setup();
    const test = 'ut';
    await user.click(input);
    await user.keyboard(test);

    expect(app.props.onChange).toHaveBeenCalledTimes(test.length);
  });
  it('Triggers search callback Button', async () => {
    const searchProp = {
      onChange: () => {},
      onSearch: vi.fn(),
      value: '',
      buttonError: false,
    };
    const app = new Search(searchProp);
    render(app.render());

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/поиск/i);

    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);

    expect(app.props.onSearch).toHaveBeenCalledTimes(2);
  });
});
