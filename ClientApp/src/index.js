import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        (<App />),
        document.getElementById('root'));

registerServiceWorker();
