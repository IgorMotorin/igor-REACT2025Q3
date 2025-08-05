import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Card from '../../component/Card';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Card/Item Component Tests', () => {
  it('Displays item name and description correctly', () => {
    const cardProp = {
      name: 'namecard',
      text: 'textcard',
      page: 1,
      id: 0,
    };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card {...cardProp}></Card>
        </Provider>
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByRole('paragraph');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('namecard');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('textcard');
  });

  it('Handles missing props gracefully', () => {
    const cardProp = {
      name: '',
      text: '',
      page: 1,
      id: 0,
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card {...cardProp}></Card>
        </Provider>
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('');

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('');
  });
});
