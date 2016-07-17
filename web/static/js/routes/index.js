import React	from 'react';
import { IndexRoute, Route } from 'react-router';
import Main 	from '../components/Main';
import Board 	from '../components/Board';
import Users 	from '../components/Users';

var configureRoutes = () => {
	return (
		<Route path="/" component={Main}>
			<IndexRoute component = {Board} />
			<Route path = "/users" component ={Users}/>
		</Route>
	)
}

export default configureRoutes;
