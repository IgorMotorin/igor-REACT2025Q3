import { render, screen } from '@testing-library/react';
import Result from '../../component/Result';

describe('Results/CardList Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      const cards = [
        { fact: '', text: '' },
        { fact: '', text: '' },
        { fact: '', text: '' },
      ];

      render(<Result cards={cards} />);

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      const cards: { fact: string; text: string }[] = [];

      render(<Result cards={cards} />);

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(1);
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      const cards = [{ fact: 'test item', text: 'test item' }];

      render(<Result cards={cards} />);

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent(/test item/i);
    });

    it('Handles missing or undefined data gracefully', async () => {
      const cards = [{ fact: '', text: '' }];

      render(<Result cards={cards} />);

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent('');
    });
  });
});
