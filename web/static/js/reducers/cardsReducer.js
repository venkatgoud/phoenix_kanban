import update from 'react-addons-update';
import Constants from '../constants';

const initialState = {
	error : null,
	requesting: false,
	list : []
};

//TODO - address errors and going back to prev state.
export default function reducer(state = initialState, action = {}){
	switch(action.type) {
		case Constants.FETCH_CARDS_REQUEST:
			return {...state, requesting: true};		 
		case Constants.FETCH_CARDS_SUCCESS:
			return {...state, requesting: false, list: action.data};
		case Constants.FETCH_CARDS_ERROR:
			return {...state, requesting: false, error: action.error};

		case Constants.CREATE_CARD_REQUEST:{
			let card = action.data;			 
			let nextState = update(state.list, {$push: [card]});			 
			return {list: nextState, requesting: true};
		}		 
		case Constants.CREATE_CARD_SUCCESS:{
			let origCardId = action.data.origCardId;
			let newCardId = action.data.card.id;
			let cardIndex = state.list.findIndex((c)=>c.id == origCardId);			
			let nextState = update(state.list, {[cardIndex]: {id: {$set: newCardId}}});
			return {list: nextState, requesting: false};
		}
		case Constants.CREATE_CARD_ERROR:{
			let origCardId = action.data.origCardId;						 
			let cardIndex = state.list.findIndex((c)=>c.id == origCardId);	
			let nextState = update(state.list,{$splice:[[cardIndex, 1]]});								
			return {list: nextState, requesting: false, error: action.error};
		}
		case Constants.UPDATE_CARD_REQUEST:{			
			let card = action.data.draftCard;
			let cardIndex = state.list.findIndex((c)=>c.id == card.id);
			let nextState = update(state.list, {[cardIndex]: {$set: card}});
			return {list: nextState, requesting: true};
		}
		case Constants.UPDATE_CARD_SUCCESS:{			 
			return {...state, requesting: false};
		}		
		case Constants.UPDATE_CARD_ERROR:{ 
			let card = action.data.card;
			let cardIndex = state.list.findIndex((c)=>c.id == card.id);
			let nextState = update(state.list, {[cardIndex]: {$set: card}});
			return {...state, requesting: false, error: action.error};
		}
		case Constants.PERSIST_CARD_DRAG_REQUEST:
			return {...state, requesting: true};
		case Constants.PERSIST_CARD_DRAG_SUCCESS:{
			let cardIndex = action.data.cardIndex;
			let card = action.data.card;
			let nextState = update(state.list,{[cardIndex] : {status : {$set: card.status}}});
			return {list: nextState, requesting: false};
		};
		case Constants.PERSIST_CARD_DRAG_ERROR: 
			return {...state, requesting: false, error: action.error};

		case Constants.CREATE_TASK_REQUEST:{
			let newTask = action.data.task;
			let cardId = action.data.cardId;
			let cardIndex = state.list.findIndex((card) => card.id == cardId);
			let nextState = update(state.list, {[cardIndex]:{tasks: {$push : [newTask]}}});			
			return {list: nextState, requesting: true};
		}
		case Constants.CREATE_TASK_SUCCESS: {
			let newTask = action.data.task;
			let oldTaskId = action.data.oldTaskId;
			let cardId = action.data.cardId;

			let cardIndex = state.list.findIndex((card) => card.id == cardId);
			let card = state.list[cardIndex];

			let taskIndex = card.tasks.findIndex((task) => task.id == oldTaskId);
			 
			let nextState = update(state.list, 
											{[cardIndex] :{tasks:{[taskIndex]:{id: 
												{$set : newTask.id}}}}});
			 
			return {list: nextState, requesting: false};
		}
		case Constants.CREATE_TASK_ERROR: {
			let task = action.data.task;
			let cardId = action.data.cardId;

			let cardIndex = state.list.findIndex((card) => card.id == cardId);
			let card = state.list[cardIndex];
			let taskIndex = card.tasks.findIndex((t) => t.id == task.id);

			let nextState = update(state.list, {
												[cardIndex] : {
													tasks: {$splice:[[taskIndex, 1]]}
												} 
										});
			return {list: nextState, requesting: false, error: action.error};
		}

		case Constants.DELETE_TASK_REQUEST: {	
			let cardId = action.data.cardId;
			let taskId = action.data.taskId;
			let cardIndex = state.list.findIndex((card) => card.id == cardId);
			let card = state.list[cardIndex];
			let taskIndex = card.tasks.findIndex((t) => t.id == taskId);
			let nextState = update(state.list, {
												[cardIndex] : {
													tasks: {$splice:[[taskIndex, 1]]}
												} 
										});		
			return {list: nextState, requesting: false};

		}
		case Constants.DELETE_TASK_REQUEST: {		 
			return {...state, requesting: true};
		}

		case Constants.DELETE_TASK_FAILURE: {			  
			return {...state, requesting: false, error: action.error};
		}

		case Constants.TOGGLE_TASK_REQUEST: {
			return {...state, requesting: true};
		}

		case Constants.TOGGLE_TASK_SUCCESS: {
			let cardId = action.data.cardId;
			let taskId = action.data.taskId;
			let done = action.data.done;

			let cardIndex = state.list.findIndex((card) => card.id == cardId);
			let card = state.list[cardIndex];
			let taskIndex = card.tasks.findIndex((t) => t.id == taskId);	

			

			let nextState = update(state.list, 
											{[cardIndex] :{tasks:{[taskIndex]:{done: 
												{$set : done}}}}
										});
		}

		case Constants.TOGGLE_TASK_FAILURE: {
			return {...state, requesting: false, error: action.error};
		}

		case Constants.UPDATE_CARD_POSITION: {
			let {cardId, afterId} = action.data;			
			let cardIndex = state.list.findIndex((card) => card.id === cardId);	
			let card = state.list[cardIndex];
			let afterIndex = state.list.findIndex((card)=> card.id === afterId);

			let nextState = update(state.list, {$splice: [[cardIndex, 1],[afterIndex, 0, card]]});

			return {list: nextState};
		}

		case Constants.UPDATE_CARD_STATUS: {			 
			let {cardId, status} = action.data;			
			let cardIndex = state.list.findIndex((card) => card.id === cardId);
			let card = state.list[cardIndex];
			let nextState = state.list;

			if (card.status != status){
				nextState = update(state.list,{[cardIndex] : {status : {$set: status}}});
			}
			return {list: nextState};
		}
		default:
			return state;
	}
}

