import { fileToBase64 } from '../function/fileToBase64';

describe('fileToBase64 function', () => {
  let mockFile: File;

  beforeEach(() => {
    // Создаем мок объекта File для тестирования
    mockFile = new File(['test content'], 'test.txt', {
      type: 'text/plain',
      lastModified: Date.now(),
    });
  });

  test('успешно конвертирует файл в base64', async () => {
    const result = await fileToBase64(mockFile);

    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  test('возвращает null при ошибке чтения файла', async () => {
    // Создаем файл с некорректным типом
    const invalidFile = new File(['invalid content'], 'invalid.txt', {
      type: 'invalid/type',
    });

    const result = await fileToBase64(invalidFile);
    expect(result).toString();
  });

  test('обрабатывает пустой файл', async () => {
    // Создаем пустой файл
    const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });

    const result = await fileToBase64(emptyFile);
    expect(result).toBeTruthy();
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  test('работает с разными типами файлов', async () => {
    // Тестируем с разными типами файлов
    const imageFile = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });

    const pdfFile = new File(['pdf content'], 'document.pdf', {
      type: 'application/pdf',
    });

    const imageResult = await fileToBase64(imageFile);
    expect(imageResult).toMatch(/^data:image\/jpeg;base64,/);

    const pdfResult = await fileToBase64(pdfFile);
    expect(pdfResult).toMatch(/^data:application\/pdf;base64,/);
  });

  test('обрабатывает ошибку чтения файла', async () => {
    // Имитируем ошибку чтения файла
    const errorFile = new File(['error content'], 'error.txt', {
      type: 'text/plain',
    });

    // Перехватываем ошибку через Promise
    await expect(fileToBase64(errorFile)).resolves.toBe(
      'data:text/plain;base64,ZXJyb3IgY29udGVudA=='
    );
  });
});
