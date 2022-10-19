import React from 'react';
import ReactDOM from 'react-dom';

import Init from './init';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './style/themes/theme-provider';

require('./style/index.less')

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Init/>
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
