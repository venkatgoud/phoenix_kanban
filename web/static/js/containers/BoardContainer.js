import React, { Component } from 'react';
import axios 	from 'axios';
import update from 'react-addons-update';
  
import Board 	from '../components/Board';

const API_URL = 'http://kanbanapi.pro-react.com';

const API_HEADERS = {
	'Content-Type': 'application/json',
	Authorization: 'VICTOR_A'// The Authorization is not needed for local server 
};

class BoardContainer extends Component {

	constructor(props){
		super(props);

		this.state = {
			cards : []
		}
	}

	addTask = (cardId, taskName) => {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		
		let newTask = {id:Date.now(), name:taskName, done:false};

		let nextState = update(this.state.cards, {[cardIndex]:{tasks: {$push : [newTask]}}});

		this.setState({cards:nextState});

		axios.post(`${API_URL}/cards/${cardId}/tasks`,JSON.stringify(newTask), {headers: API_HEADERS})
		.then((response) => {
			newTask.id = response.data.id;			
			this.setState({cards: nextState});
		})
		.catch((error) => {
			this.setState(prevState);
			console.log(error);
			throw new Error("Server response wasn't OK");
		})	
	}

	deleteTask = (cardId, taskId, taskIndex) => {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		let nextState = update(this.state.cards, {
												[cardIndex] : {
													tasks: {$splice:[[taskIndex, 1]]}
												} 
										});
		this.setState({cards: nextState})

		axios.delete(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{headers: API_HEADERS})
		.catch((error) => {
			let prevState = this.state;
			console.log(error);
			throw new Error("Server response wasn't OK");			
		});
	}

	toggleTask = (cardId, taskId, taskIndex) => {
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		
		let newDoneValue;

		let nextState = update(this.state.cards, 
											{[cardIndex] :{tasks:{[taskIndex]:{done: 
												{$apply : (done)=>{
												newDoneValue = !done; return newDoneValue;}}}}}
										});

		this.setState({cards: nextState});

		axios.put(`${API_URL}/cards/${cardId}/tasks/${taskId}`,
			JSON.stringify({done:newDoneValue}),
			{headers: API_HEADERS})
		.catch((error) => {
			let prevState = this.state;
			console.log(error);
			throw new Error("Server response wasn't OK");
		});
	}

	updateCardStatus = (cardId, listId) => {
		let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

		let card = this.state.cards[cardIndex];

		if (card.status != listId){
			this.setState(update(this.state,{
				cards: {
					[cardIndex] : {
						status : {$set: listId}
					}
				}
			}));
		}
	}

	updateCardPosition = (cardId, afterId) =>{
		let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);	
		let card = this.state.cards[cardIndex];

		let afterIndex = this.state.cards.findIndex((card)=> card.id === afterId);

		this.setState(update(this.state, {
			cards: {
				$splice: [
						[cardIndex, 1],
						[afterIndex, 0, card]
				]
			}
		}))

	}

	componentDidMount(){
		axios.get(API_URL+'/cards',{headers: API_HEADERS})
  	.then((response) => {   		 
  		this.setState({cards: response.data})  		
  	})  	 
  	.catch((error) => {
    	console.log(error);
  	});
	}

	render() {
		return (
			<Board 
				cards={this.state.cards} 
				taskCallbacks = {{
					toggle: this.toggleTask,
					delete: this.deleteTask,
					   add: this.addTask
				}}
				cardCallbacks = {{
					updateStatus: this.updateCardStatus,
          updatePosition: this.updateCardPosition
				}}
			/>
		);
	}
}

export default BoardContainer;


