import React from 'react';
import { render } from 'react-dom';
import 'bulma/css/bulma.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
// createRoot(document.getElementById('root')).render(<App />);
registerServiceWorker();
