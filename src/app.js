import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './stores';
import { Home } from './components/layout';

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <div>
          <Home />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
