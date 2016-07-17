import React, { Component } from 'react';
import CardList from './CardList'
import { Col } from 'react-bootstrap';

let cardsList = [ 
	{
	    id: 1,
	    title: "Read the Book",
	    description: "I should read the whole book",
	    status: "in-progress",
	    tasks: []
	}, 
	{
	    id: 2,
	    title: "Write some code",
	    description: "Code along with the samples in the book",
	    status: "todo",
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

export default class Board extends Component {

	filterCards = (cards, status) => {
		return cards.filter((card) => card.status === status)
	}

	render() {
		return (
			<div className='row'>
				<Col md={4}>
				<CardList id = 'todo'
					category = 'To Do' 
					list={this.filterCards(cardsList, 'todo')}/>
				</Col>
				<Col md={4}>
				<CardList id = 'in-progress' 
					category = 'In Progress' 
					list={this.filterCards(cardsList, 'in-progress')}/>
				</Col>
				<Col md={4}>
				<CardList id = 'done' 
					category = 'Done' 
					list={this.filterCards(cardsList, 'done')}/>
				</Col>
			</div>
		);
	}
}
