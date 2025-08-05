import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Popup from '../../component/Popup';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const checkSlice1 = createSlice({
  name: 'check',
  initialState: {
    value: { 1: false, 2: true },
    books: [{ id: 1, title: 'title1', authors: [{ name: 'name1' }] }],
  },
  reducers: {},
});

const checkSlice2 = createSlice({
  name: 'check',
  initialState: {
    value: {},
    books: [],
  },
  reducers: {},
});

const store1 = configureStore({
  reducer: checkSlice1.reducer,
});

const store2 = configureStore({
  reducer: checkSlice2.reducer,
});

describe('Popup Component Tests', () => {
  it('Displays item name and description correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store1}>
          <Popup></Popup>
        </Provider>
      </BrowserRouter>
    );

    const listitem = screen.getAllByRole('listitem');
    expect(listitem[0]).toBeInTheDocument();
    expect(listitem[0]).toHaveTextContent('id: 1');

    const input = screen.getAllByRole('checkbox');
    expect(input[1]).toBeInTheDocument();
    expect(input[1]).toBeChecked();
  });

  it('Displays item name and description correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store2}>
          <Popup></Popup>
        </Provider>
      </BrowserRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Download' });

    expect(button).toBeInTheDocument();
  });
});
