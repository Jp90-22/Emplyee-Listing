import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store' 
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        (
        <Provider store={store}>
                <App />
        </Provider>
        ),
        document.getElementById('root'));

registerServiceWorker();
