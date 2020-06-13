import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import ComingSoon from './pages/coming-soon/coming-soon';
// import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ScrollMemory />
        <PersistGate persistor={persistor}>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </PersistGate>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
// serviceWorker.unregister();
