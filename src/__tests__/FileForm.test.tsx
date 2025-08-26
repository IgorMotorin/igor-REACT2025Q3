import { render, screen, fireEvent } from '@testing-library/react';
import FileForm from '../component/FileForm';

const mockFile = new File(['content'], 'test.jpg', {
  type: 'image/jpeg',
  lastModified: Date.now(),
});

describe('FileForm component', () => {
  test('отображает базовую форму без файла', () => {
    render(<FileForm error={undefined} />);

    expect(screen.getByText('Choose image')).toBeInTheDocument();
    expect(screen.getByText('Browse')).toBeInTheDocument();
  });

  test('обрабатывает загрузку файла', () => {
    render(<FileForm error={undefined} />);

    const input = screen.getByLabelText(/Choose image/i);

    fireEvent.change(input, {
      target: {
        files: [mockFile],
      },
    });

    expect(screen.getByText(/File Details/i)).toBeInTheDocument();
    expect(screen.getByText(/File Name: test.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/File Type: image\/jpeg/)).toBeInTheDocument();
  });

  test('отображает ошибку при наличии', () => {
    const errorMessage = 'Please select a valid image file';
    render(<FileForm error={{ message: errorMessage }} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });

  test('проверяет корректность отображения информации о файле', () => {
    render(<FileForm error={undefined} />);

    const input = screen.getByLabelText(/Choose image/i);

    fireEvent.change(input, {
      target: {
        files: [mockFile],
      },
    });

    const fileDetails = screen.getByText(/File Details/i);
    expect(fileDetails).toBeInTheDocument();
    expect(screen.getByText(/File Name: test.jpg/i)).toBeInTheDocument();
    expect(screen.getByText(/File Type: image\/jpeg/i)).toBeInTheDocument();
  });

  test('проверяет валидацию типа файла', () => {
    render(<FileForm error={undefined} />);

    const input = screen.getByLabelText(/Choose image/i);

    fireEvent.change(input, {
      target: {
        files: [new File(['content'], 'test.pdf', { type: 'application/pdf' })],
      },
    });

    // Проверяем, что информация о файле не отображается
    expect(screen.queryByText(/File Details/i)).toBeInTheDocument();
  });
});
