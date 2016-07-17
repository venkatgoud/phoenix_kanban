import {combineReducers} from  'redux';
import dummyReducer		from 	'./dummyReducer';

export default combineReducers({
	dummy: dummyReducer
})
