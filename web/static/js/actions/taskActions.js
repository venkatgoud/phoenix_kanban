import axios 	from 'axios';
import Constants	from '../constants';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type': 'application/json',
	Authorization: 'VICTOR_A'// The Authorization is not needed for local server 
};

const Actions = {
	 addTask : (cardId, taskName) => {
	 		return (dispatch) => {
	 			let newTask = {id:Date.now(), name:taskName, done:false};
	 			dispatch({type: Constants.CREATE_TASK_REQUEST, 
	 				data: {task: newTask, cardId: cardId}}); 	 			

	 			axios.post(`${API_URL}/cards/${cardId}/tasks`,JSON.stringify(newTask), 
	 				{headers: API_HEADERS})
				.then((response) => {
					dispatch({type: Constants.CREATE_TASK_SUCCESS, 
						data: {task: response.data, oldTaskId: newTask.id, cardId: cardId}}); 
				})
				.catch((error) => {
					dispatch({type: Constants.CREATE_TASK_FAILURE, error: error,
						data: {task: newTask, cardId: cardId}}); 
					console.log(error);					 
				})
	 		}
	 }, 
	 deleteTask: (cardId, taskId,taskIndex) => {
	 		return (dispatch) => {	 			 
	 			dispatch({type: Constants.DELETE_TASK_REQUEST, 
	 				data: {cardId: cardId, taskId: taskId}});

	 			axios.delete(`${API_URL}/cards/${cardId}/tasks/${taskId}`,
	 				{headers: API_HEADERS})
	 			.then(()=> {
	 				dispatch({type: Constants.DELETE_TASK_SUCCESS, 
	 					data: {cardId: cardId, taskId: taskId}});
	 			})
				.catch((error) => {			 					
					console.log(error);
					dispatch({type: Constants.DELETE_TASK_FAILURE,error: error, 
					data: {cardId: cardId, taskId: taskId}});
				});	
	 		}
	 },

	 toggleTask: (cardId, taskId, taskIndex, taskDone) => {
	 		return (dispatch) => {
	 			dispatch({type: Constants.TOGGLE_TASK_REQUEST,
	 				data: {cardId: cardId, taskId: taskId}});

	 			axios.put(`${API_URL}/cards/${cardId}/tasks/${taskId}`,
	 				JSON.stringify({done:taskDone}),
					{headers: API_HEADERS})
	 			.then((response) => {
	 				dispatch({type: Constants.TOGGLE_TASK_SUCCESS,
	 					data: {cardId: cardId, taskId: taskId, done:taskDone}});
	 			})
				.catch((error) => {			
					console.log(error);
					dispatch({type: Constants.TOGGLE_TASK_FAILURE,error: error,
						data: {cardId: cardId, taskId: taskId}});
				});
	 		}
	 }
} 

export default Actions;