import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Details from '../../component/Details';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Details Component Tests', () => {
  it('Displays item name and description correctly', () => {
    // const page = 1;

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Details></Details>
        </Provider>
      </BrowserRouter>
    );

    const heading = screen.getAllByRole('heading');
    const paragraph = screen.getAllByRole('paragraph');
    expect(heading[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent('id:');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[0]).toHaveTextContent('');
  });
});
