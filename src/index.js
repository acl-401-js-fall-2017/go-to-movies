import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import OmdbApp from './omdbApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<OmdbApp />, document.getElementById('root'));
registerServiceWorker();
