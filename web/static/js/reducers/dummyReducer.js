import Constants from '../constants';

const initialState = {
	error : null,
	fetching: false
};

export default function reducer(state = initialState, action = {}){
	switch(action.type) {
		case Constants.DUMMY_ACTION:
			return {...state, fetching: true};
		default:
			return state;
	}
}

