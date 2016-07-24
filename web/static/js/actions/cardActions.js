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

	updateCardStatus: (cardId, status) => {		 
		return (dispatch) => {
			dispatch({type: Constants.UPDATE_CARD_STATUS, 
				data: {cardId: cardId, status: status}});
		}
	},

	updateCardPosition: (cardId , afterId) => {
		return (dispatch) => {
			dispatch({type: Constants.UPDATE_CARD_POSITION, data: {cardId: cardId, afterId: afterId}});
		}
	},

	persistCardDrag: (card, cardIndex) => {		 
		return (dispatch) => {
			dispatch({type: Constants.PERSIST_CARD_DRAG_REQUEST})

			axios.put(`${API_URL}/cards/${card.id}`,
				JSON.stringify({status: card.status, row_order_position: cardIndex}),
				{headers: API_HEADERS})
			.then((response) => {
				dispatch({type: Constants.PERSIST_CARD_DRAG_SUCCESS, 
					data:{card: card, cardIndex : cardIndex}});
			})
			.catch((error) => {
				dispatch({type: Constants.PERSIST_CARD_DRAG_ERROR, error: error})
			})	
		}	
	},

	toggleDetails: (cardId) => {
		return (dispatch) => {
			dispatch({type: Constants.TOGGLE_CARD_DETAILS, data:{cardId: cardId}})
		}
	}

} 

export default Actions;