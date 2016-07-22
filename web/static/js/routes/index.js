import React	from 'react';
import { IndexRoute, Route } from 'react-router';
import Main 	from '../components/Main';
import BoardContainer 	from '../containers/BoardContainer';
import Board 	from '../components/Board';
import NewCard 	from '../components/NewCard';
import EditCard 	from '../components/EditCard';

var configureRoutes = () => {
	return (
		 
			<Route component={BoardContainer}>	
				<Route path="/" component={Board}>
					<Route path="new" component={NewCard} />
					<Route path="edit/:card_id" component={EditCard} /> 
				</Route>
			</Route>
		 
	)
}

export default configureRoutes;
