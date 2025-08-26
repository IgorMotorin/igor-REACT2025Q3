import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { ControlledForm } from '../component/ControlledForm';
import { store } from '../store/store.tsx';
import { Provider } from 'react-redux';

vi.mock('../function/fileToBase64.tsx', () => ({
  fileToBase64: async () => 'base64-string',
}));

describe('ControlledForm Component', () => {
  test('renders form with all fields', () => {
    render(
      <Provider store={store}>
        <ControlledForm />
      </Provider>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password Confirm')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
    expect(screen.getByLabelText('Country:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('validates form fields correctly', async () => {
    render(
      <Provider store={store}>
        <ControlledForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Age'), '25');
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'StrongPass123!');
    await userEvent.type(
      screen.getByLabelText('Password Confirm'),
      'StrongPass123!'
    );
    await userEvent.selectOptions(screen.getByLabelText('Gender:'), ['male']);
    await userEvent.type(screen.getByLabelText('Country:'), 'Russia');
    await userEvent.click(screen.getByLabelText(/Terms and Conditions/i));

    expect(submitButton).not.toBeDisabled();
  });

  test('handles file upload correctly', async () => {
    render(
      <Provider store={store}>
        <ControlledForm />
      </Provider>
    );

    const fileInput = screen.getByLabelText(/Browse/i);
    const file = new File(['file content'], 'test.jpg', { type: 'image/jpeg' });

    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });
  });

  test('checks password strength correctly', async () => {
    render(
      <Provider store={store}>
        <ControlledForm />
      </Provider>
    );

    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(passwordInput, '123');
    await waitFor(() => {
      expect(screen.getByText('Слабый пароль')).toBeInTheDocument();
    });

    await userEvent.type(passwordInput, 'abc123');
    await waitFor(() => {
      expect(screen.getByText('Средний пароль')).toBeInTheDocument();
    });

    await userEvent.type(passwordInput, 'A1@');
    await waitFor(() => {
      expect(screen.getByText('Сильный пароль')).toBeInTheDocument();
    });
  });
});
