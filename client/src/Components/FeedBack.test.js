import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import FeedBack from './FeedBack';

const mockStore = configureStore([]);

describe('FeedBack Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        user: { email: 'testuser@example.com', _id: '1' },
        isLogin: true,
      },
      posts: {
        posts: [
          {
            _id: 'post1',
            email: 'testuser@example.com',
            postMsg: 'Test feedback',
            createdAt: new Date().toISOString(),
            likes: { count: 2 },
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  test('renders textarea and share button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/share your feedback/i);
    const button = screen.getByText(/share/i);

    expect(textArea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('handles user input in textarea', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/share your feedback/i);

    userEvent.type(textArea, 'This is my feedback!');
    expect(textArea).toHaveValue('This is my feedback!');
  });

  test('handles share button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const textArea = screen.getByPlaceholderText(/share your feedback/i);
    const button = screen.getByText(/share/i);

    userEvent.type(textArea, 'This is my feedback!');
    userEvent.click(button);

    // Expect a dispatch to savePost action
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('renders posts list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const postMessage = screen.getByText(/test feedback/i);
    const likeButton = screen.getByText(/👍/i);

    expect(postMessage).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
  });

  test('handles like button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const likeButton = screen.getByText(/👍/i);
    userEvent.click(likeButton);

    // Expect a dispatch to likePost action
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('handles edit button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const editButton = screen.getByText(/edit/i);
    userEvent.click(editButton);

    const input = screen.getByDisplayValue('Test feedback');
    userEvent.type(input, ' Updated');

    const saveButton = screen.getByText(/save/i);
    userEvent.click(saveButton);

    // Expect a dispatch to updatePost action
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('handles delete button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedBack />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByText(/delete/i);
    userEvent.click(deleteButton);

    // Expect a dispatch to deletePost action
    expect(store.dispatch).toHaveBeenCalled();
  });
});
