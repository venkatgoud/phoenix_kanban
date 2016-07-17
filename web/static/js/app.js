import React			from 'react';
import ReactDOM		from 'react-dom';
import {browserHistory}	from 'react-router';
import configureStore		from './store';
import Root		from './containers/root';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const store = configureStore(browserHistory);
const target = document.getElementById('app_container');

const root = <Root
								routerHistory={browserHistory}
								store={store}
							/>;

ReactDOM.render(root, target);
