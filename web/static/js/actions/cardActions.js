import axios 	from 'axios';
import Constants	from '../constants';
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type': 'application/json',
	Authorization: 'VICTOR_A'// The Authorization is not needed for local server 
};

const Actions = {
	
	fetchCards: () => {
		return (dispatch) => {
			dispatch({type: Constants.FETCH_CARDS_REQUEST});

			axios.get(API_URL+'/cards',{headers: API_HEADERS})
  		.then((response) => {   
  			dispatch({type: Constants.FETCH_CARDS_SUCCESS, data: response.data});		   			 
  		})  	 
  		.catch((error) => {
    		console.log(error);
    		dispatch({type: Constants.FETCH_CARDS_FAILURE, error: error});
  		});
		}
	},

	addCard: (card) => {
		return (dispatch) => {
			dispatch({type: Constants.CREATE_CARD_REQUEST, data: card});			

			axios.post(`${API_URL}/cards`,
				JSON.stringify(card),
				{headers: API_HEADERS})
			.then((response) => {   		 
				dispatch({type: Constants.CREATE_CARD_SUCCESS, 
					data: {card: response.data, origCardId: card.id}});		   			 	 
  		})
  		.catch((error) => {
  			dispatch({type: Constants.CREATE_CARD_SUCCESS, error: error,
  			data: {origCardId: card.id}});
  		}); 
		}
	},

	updateCard: (card, draftCard) => {
		return (dispatch) => {
			dispatch({type: Constants.UPDATE_CARD_REQUEST, 
				data:{card : card, draftCard: draftCard}});

			axios.put(`${API_URL}/cards/${card.id}`,
				JSON.stringify(draftCard),
				{headers: API_HEADERS})		 
			.then((response) => {
				dispatch({type: Constants.UPDATE_CARD_SUCCESS, data: response.data});		   			 	 	
			})
  		.catch((error) => {
  			console.log(error); 
  			dispatch({type: Constants.UPDATE_CARD_FAILURE, error: error,
  				data: {card: card, draftCard: draftCard}});		   			 	 	 			 
  		}); 	
		}
	},

	updateCardStatus: (cardId, listId) => {
		return (dispatch) => {
			dispatch({type: Constants.UPDATE_CARD_STATUS, data: {cardId: cardId, listId: listId}});
		}
	},

	updateCardPosition: (cardId , afterId) => {
		return (dispatch) => {
			dispatch({type: Constants.UPDATE_CARD_POSITION, data: {cardId: cardId, afterId: afterId}});
		}
	},

	persistCardDrag: (cardProps) => {		 
		return (dispatch) => {
			dispatch({type: Constants.PERSIST_CARD_DRAG_REQUEST})

			axios.put(`${API_URL}/cards/${cardId}`,
				JSON.stringify({status: card.status, row_order_position: cardIndex}),
				{headers: API_HEADERS})
			.then((response) => {
				dispatch({type: Constants.PERSIST_CARD_DRAG_SUCCESS})
			})
			.catch((error) => {
				dispatch({type: Constants.PERSIST_CARD_DRAG_ERROR, error: error})
			})	
		}	
	}

} 

export default Actions;