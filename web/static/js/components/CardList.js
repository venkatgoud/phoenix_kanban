import React, { Component } from 'react';
import Card from './Card'
import { Col } from 'react-bootstrap';

function displayCards(cards) {
	return cards.map(function(card){
		return <Card 
			title={card.title}
			description={card.description}
			status={card.status}
			tasks={card.tasks}
			key={card.id}
			id={card.id}
		/>
	 	
	});	
}

export default class CardList extends Component {
	render() {
		return (
			<div className='list'>
				<h1>{this.props.category} </h1>
				{displayCards(this.props.list)}	 	 
			</div>
		);
	}
}
