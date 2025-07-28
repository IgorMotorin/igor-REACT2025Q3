import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result';

describe('Results/CardList Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      const cards = [
        { fact: '', text: '' },
        { fact: '', text: '' },
        { fact: '', text: '' },
      ];
      const page = 1;
      const details = 0;

      render(
        <BrowserRouter>
          <Result cards={cards} page={page} details={details} />
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      const cards: { fact: string; text: string }[] = [];
      const page = 1;
      const details = 0;

      render(
        <BrowserRouter>
          <Result cards={cards} page={page} details={details} />
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(1);
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      const cards = [{ fact: 'test item', text: 'test item' }];
      const page = 1;
      const details = 0;

      render(
        <BrowserRouter>
          <Result cards={cards} page={page} details={details} />
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent(/test item/i);
    });

    it('Handles missing or undefined data gracefully', async () => {
      const cards = [{ fact: '', text: '' }];

      const page = 1;
      const details = 0;

      render(
        <BrowserRouter>
          <Result cards={cards} page={page} details={details} />
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent('');
    });
  });
});
