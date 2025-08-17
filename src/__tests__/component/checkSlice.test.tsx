import { describe, expect, it } from 'vitest';
import checkReducer, {
  onCheck,
  onPage,
  onSearch,
  onInput,
  onBooks,
  type CheckState,
} from '../../store/checkSlice';

describe('postsSlice reducer', () => {
  const initialState: CheckState = {
    value: {},
    page: '1',
    search: '',
    input: '',
    books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
    theme: 'light',
  };

  it('should handle initial state', () => {
    expect(
      checkReducer(undefined, {
        type: '',
      })
    ).toEqual(initialState);
  });

  it('should handle add check', () => {
    const newPost1 = { id: 1 };
    const expectedState1 = {
      value: { 1: true },
      page: '1',
      search: '',
      input: '',
      books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
      theme: 'light',
    };

    expect(checkReducer(initialState, onCheck(newPost1))).toEqual(
      expectedState1
    );
  });
  it('should handle page', () => {
    const newPost1 = '10';
    const expectedState1 = {
      value: {},
      page: '10',
      search: '',
      input: '',
      books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
      theme: 'light',
    };

    expect(checkReducer(initialState, onPage(newPost1))).toEqual(
      expectedState1
    );
  });
  it('should handle search', () => {
    const newPost1 = 'search';
    const expectedState1 = {
      value: {},
      page: '1',
      search: 'search',
      input: '',
      books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
      theme: 'light',
    };

    expect(checkReducer(initialState, onSearch(newPost1))).toEqual(
      expectedState1
    );
  });
  it('should handle input', () => {
    const newPost1 = 'input';
    const expectedState1 = {
      value: {},
      page: '1',
      search: '',
      input: 'input',
      books: { 0: { id: '0', title: '', authors: [{ name: '' }] } },
      theme: 'light',
    };

    expect(checkReducer(initialState, onInput(newPost1))).toEqual(
      expectedState1
    );
  });
  it('should handle books', () => {
    const newPost1 = { 1: { id: '0', title: '', authors: [{ name: '' }] } };
    const expectedState1 = {
      value: {},
      page: '1',
      search: '',
      input: '',
      books: {
        0: { id: '0', title: '', authors: [{ name: '' }] },
        1: { id: '0', title: '', authors: [{ name: '' }] },
      },
      theme: 'light',
    };

    expect(checkReducer(initialState, onBooks(newPost1))).toEqual(
      expectedState1
    );
  });
});
