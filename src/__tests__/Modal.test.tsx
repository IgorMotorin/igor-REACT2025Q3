import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../component/Modal';
import { vi, type Mock } from 'vitest';

describe('Modal component', () => {
  let handleCloseMock: Mock<(...args: string[]) => string>;
  let isShowing: boolean;

  beforeEach(() => {
    handleCloseMock = vi.fn();
    isShowing = true;
  });

  test('отображает модальное окно при isShowing = true', () => {
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  test('не отображает модальное окно при isShowing = false', () => {
    isShowing = false;
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('закрывает модальное окно при клике вне его', () => {
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('закрывает модальное окно при нажатии Escape', () => {
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('закрывает модальное окно при нажатии на крестик', () => {
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('правильно отображает переданный контент', () => {
    const content = 'Тестовый контент';
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        {content}
      </Modal>
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('проверяет корректность ARIA-атрибутов', () => {
    render(
      <Modal isShowing={isShowing} handleClose={handleCloseMock}>
        <div>Содержимое модального окна</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
