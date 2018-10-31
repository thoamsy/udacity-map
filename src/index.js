import React from 'react';
import { createRoot } from 'react-dom';
import 'bulma/css/bulma.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

createRoot(document.getElementById('root')).render(<App />);
registerServiceWorker();
