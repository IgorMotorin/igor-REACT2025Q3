export const fileToBase64 = (file: File): Promise<string | null> => {
  const fr = new FileReader();
  return new Promise((res, rej) => {
    fr.onloadend = (): void => {
      const { result } = fr;
      res(typeof result === 'string' ? result : null);
    };
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
};
