import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import InputForm from '../component/InputForm';

describe('InputForm Component', () => {
  test('renders input form with all props', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('renders label correctly', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    const label = screen.getByLabelText('Test Label');
    expect(label).toHaveClass(
      ' w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
    );
  });

  test('renders error message when provided', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={{ message: 'This field is required' }}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass(
      'text-red-500'
    );
  });

  test('input field has correct attributes', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('required', '');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  test('input has correct styles', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('w-full rounded-md');
    expect(input).toHaveClass('border border-[#e0e0e0]');
    expect(input).toHaveClass('bg-white');
    expect(input).toHaveClass('py-1 px-3');
    expect(input).toHaveClass('text-base font-medium text-[#6B7280]');
  });

  test('input has correct focus styles', async () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    await userEvent.type(input, 'test');

    expect(input).toHaveClass('focus:border-[#6A64F1]');
    expect(input).toHaveClass('focus:shadow-md');
  });

  test('input is required', () => {
    render(
      <InputForm
        name="test-input"
        placeholder="Enter text"
        type="text"
        label="Test Label"
        error={undefined}
      />
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('required', '');
  });
});
