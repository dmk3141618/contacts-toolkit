import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '~/App';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from '~/common/store';

test('renders Header', () => {
  const {getByText} = render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
  expect(getByText(/ContactsPage/i)).toBeInTheDocument();
  expect(getByText(/PreviewComponentsPage/i)).toBeInTheDocument();
});

test('renders Footer', () => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
  const allRightsElement = screen.getByText(/all rights reserved/i);
  expect(allRightsElement).toBeInTheDocument();
});
