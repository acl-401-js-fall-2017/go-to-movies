import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import movieApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<movieApp />, document.getElementById('root'));
registerServiceWorker();
