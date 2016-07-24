import React, { Component } from 'react'; 
import { connect }      from 'react-redux'; 
  
import Board 	from '../components/Board';
import CardActions from '../actions/cardActions';
import TaskActions from '../actions/taskActions';

import { throttle } from '../utils';
 
class BoardContainer extends Component {

	constructor(props){
		super(props);
		//TODO
		// Only call updateCardStatus when arguments change
  	// this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
  	// Call updateCardPosition at max every 500ms (or when arguments change)
  	// this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
	}

	componentDidMount(){
		const { dispatch } = this.props;
    dispatch(CardActions.fetchCards());
	}

	addTask = (cardId, newTask) => {
		const { dispatch } = this.props;
    dispatch(TaskActions.addTask(cardId, newTask));	
	}

	deleteTask = (cardId, taskId,taskIndex) => {
		const { dispatch } = this.props;
		
    dispatch(TaskActions.deleteTask(cardId, taskId,taskIndex));	
	}

	toggleTask = (cardId, taskId,taskIndex) => {
		const { dispatch } = this.props;
		let cardIndex = this.props.cards.findIndex((card) => card.id == cardId);
		let card = this.props.cards[cardIndex];		 
		let task = card.tasks[taskIndex];

    dispatch(TaskActions.toggleTask(cardId, taskId,taskIndex, !(task.done)));	
	}

	addCard = (card) => {
		const { dispatch } = this.props;
		dispatch(CardActions.addCard(card));	
	}

	updateCard = (draftCard) => {
		const { dispatch } = this.props;
		let cardIndex = this.props.cards.findIndex((c)=>c.id == draftCard.id);
		let card = this.props.cards[cardIndex];

		dispatch(CardActions.updateCard(card, draftCard));	
	}

	render() {
		//TODO - why do I need to clone?
		let board = this.props.children && React.cloneElement(this.props.children,{
			cards: this.props.cards,
			taskCallbacks: {
					toggle: this.toggleTask,
					delete: this.deleteTask,
					   add: this.addTask
			},
			cardCallbacks: {
					addCard: this.addCard,
					updateCard: this.updateCard,
					updateStatus: this.updateCardStatus,
          updatePosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag
			}
		})
		return board;
	}
}
 
const mapStateToProps = (state) => ({
  cards: state.cards.list
});

export default connect(mapStateToProps)(BoardContainer);


