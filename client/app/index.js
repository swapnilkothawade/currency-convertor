import React from 'react';
import { render } from 'react-dom';

import Home from './components/Home/Home';

import './styles/styles.scss';

render((
        <Home />
), document.getElementById('app'));
