export const checkStrength = (password: string) => {
  if (!password) return null;
  const hasLetters = /[A-Za-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
    return 'strong';
  }
  if (password.length >= 6 && hasLetters && hasNumbers) {
    return 'medium';
  }
  return 'weak';
};
