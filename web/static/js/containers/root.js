import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, RoutingContext } from 'react-router';
import invariant from 'invariant';
import configureRoutes from '../routes';

const propTypes = {
	routerHistory: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired
};

const Root = ({routerHistory, store}) => {
	invariant(routerHistory,
		'<Root /> needs routerHistory to render.'
	)

	return(
		<Provider store={store}>
			<Router history={routerHistory}>
				{configureRoutes()}
			</Router>
		</Provider>
	) 
}

Root.propTypes = propTypes; 

export default Root;
