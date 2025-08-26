import { render, screen } from '@testing-library/react';
import Card from '../component/Card';

describe('Card component', () => {
  const defaultProps = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    password: 'password123',
    passwordConfirm: 'password123',
    gender: 'Male',
    terms: 'Accepted',
    file: 'path/to/image.jpg',
    country: 'USA',
    lost: false,
  };

  test('отображает все поля корректно', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(/Name: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail: john@example.com/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Password: password123/i)[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Confirm Password: password123/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms: Accepted/i)).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  test('проверяет корректность отображения изображения', () => {
    render(<Card {...defaultProps} />);

    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', 'path/to/image.jpg');
    expect(img).toHaveAttribute('width', '100px');
  });

  test('проверяет классы при lost = true', () => {
    const lostProps = { ...defaultProps, lost: true };
    render(<Card {...lostProps} />);

    const card = screen.getByRole('group');
    expect(card).toHaveClass('from-pink-700');
    expect(card).toHaveClass('to-blue-700');
  });

  test('проверяет обязательные поля', () => {
    const minimalProps = {
      name: 'Jane Doe',
      age: 25,
      email: 'jane@example.com',
      password: 'securepass',
      passwordConfirm: 'securepass',
      gender: 'Female',
      country: 'Canada',
      terms: 'Accepted',
    };
    render(<Card file={''} lost={false} {...minimalProps} />);

    expect(screen.getByText(/Name: Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail: jane@example.com/i)).toBeInTheDocument();
  });

  test('проверяет отсутствие лишних полей', () => {
    const emptyFileProps = { ...defaultProps, file: '1' };
    render(<Card {...emptyFileProps} />);

    expect(screen.queryByAltText('')).toBeInTheDocument();
  });
});
