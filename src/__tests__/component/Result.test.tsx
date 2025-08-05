import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Result from '../../component/Result';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Results/CardList Component Tests', () => {
  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      const cards = [
        { title: '', id: 1, authors: [{ name: '' }] },
        { title: '', id: 1, authors: [{ name: '' }] },
        { title: '', id: 1, authors: [{ name: '' }] },
      ];
      const page = 1;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result
              cards={cards}
              page={page}
              error={false}
              spinner={false}
              errorText=""
            />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input.length).toEqual(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      const cards: {
        title: string;
        id: number;
        authors: [{ name: string }];
      }[] = [];
      const page = 1;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result
              cards={cards}
              page={page}
              error={false}
              spinner={false}
              errorText=""
            />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findByText('No result...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveTextContent('No result...');
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      const cards = [
        { title: 'test item', id: 1, authors: [{ name: 'test item' }] },
      ];
      const page = 1;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result
              cards={cards}
              page={page}
              error={false}
              spinner={false}
              errorText=""
            />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('listitem');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent(/test item/i);
    });

    it('Handles missing or undefined data gracefully', async () => {
      const cards = [{ title: '', id: 1, authors: [{ name: '' }] }];
      const page = 1;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Result
              cards={cards}
              page={page}
              error={false}
              spinner={false}
              errorText=""
            />
          </Provider>
        </BrowserRouter>
      );

      const input = await screen.findAllByRole('link');
      expect(input[0]).toBeInTheDocument();
      expect(input[0]).toHaveTextContent('');
    });
  });
});
