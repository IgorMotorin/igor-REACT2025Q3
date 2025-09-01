import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../component/Search';
import { act } from 'react-dom/test-utils';
import { type Mock, vi } from 'vitest';

// Мок данных для тестирования
const mockCountry = {
  'United States': false,
  Canada: false,
  Mexico: false,
};

describe('Search Component', () => {
  let setCountryMock: Mock;

  beforeEach(() => {
    setCountryMock = vi.fn();

    render(<Search country={mockCountry} setCountry={setCountryMock} />);
  });

  test('renders correctly', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('updates search input correctly', () => {
    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'United' } });

    expect(input.value).toBe('United');
  });

  test('handles search correctly', async () => {
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'United' } });
      fireEvent.click(button);
    });

    expect(setCountryMock).toHaveBeenCalledWith({
      'United States': { code: 'US' },
    });
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('handles empty search', async () => {
    const button = screen.getByText('Search');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(setCountryMock).toHaveBeenCalledWith(mockCountry);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('handles non-matching search', async () => {
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Germany' } });
      fireEvent.click(button);
    });

    expect(setCountryMock).toHaveBeenCalledWith({});
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('updates count on country change', () => {
    const newCountry = {
      Brazil: { iso_code: 'BR' },
    };

    act(() => {
      setCountryMock(newCountry);
    });

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
