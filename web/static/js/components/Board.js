import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardList from './CardList'

let cardsList = [ 
	{
	    id: 1,
	    title: "Read the Book",
	    description: "I should read the **whole** book",
	    status: "in-progress",
	    color: '#BD8D31',
	    tasks: []
	}, 
	{
	    id: 2,
	    title: "Write some code",
	    description: "Code along with the samples in the book",
	    status: "todo",
	    color: '#3A7E28',
	    tasks: [
			{
				id: 1,
        name: "ContactList Example",
				done: true },
			{
				id: 2,
        name: "Kanban Example",
        done: false
      },
			{
				id: 3,
        name: "My own experiments",
				done: false }
			] 
	},
];

class Board extends Component {

	filterCards = (cards, status) => {
		return cards.filter((card) => 			
			{					
				return (card.status === status);
			}
		)
	}

	render() {		 
		let cardModal=this.props.children && React.cloneElement(this.props.children, {
			cards: this.props.cards,
			cardCallbacks: this.props.cardCallbacks });

		return (
			<div className='row board'>
				<Link to='/new' className="float-button">+</Link>
				<Col md={4}>
				<CardList id = 'todo'
					category = 'To Do'
					taskCallbacks={this.props.taskCallbacks}
					cardCallbacks={this.props.cardCallbacks} 
					list={this.filterCards(this.props.cards, 'todo')}/>
				</Col>
				<Col md={4}>
				<CardList id = 'in-progress' 
					category = 'In Progress'
					taskCallbacks={this.props.taskCallbacks} 
					cardCallbacks={this.props.cardCallbacks}
					list={this.filterCards(this.props.cards, 'in-progress')}/>
				</Col>
				<Col md={4}>
				<CardList id = 'done' 
					category = 'Done'
					taskCallbacks={this.props.taskCallbacks}
					cardCallbacks={this.props.cardCallbacks} 
					list={this.filterCards(this.props.cards, 'done')}/>
				</Col>
				{cardModal}
			</div>
		);
	}
}

Board.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object), 
	taskCallbacks: PropTypes.object, 
	cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(Board);
 

