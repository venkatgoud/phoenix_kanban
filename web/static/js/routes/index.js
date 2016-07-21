import React	from 'react';
import { IndexRoute, Route } from 'react-router';
import Main 	from '../components/Main';
import BoardContainer 	from '../containers/BoardContainer';
import Users 	from '../components/Users';

var configureRoutes = () => {
	return (
		<Route path="/" component={Main}>
			<IndexRoute component = {BoardContainer} />
			<Route path = "/users" component ={Users}/>
		</Route>
	)
}

export default configureRoutes;
