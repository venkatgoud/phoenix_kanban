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
		/>
	 	
	});	
}

export default class CardList extends Component {
	render() {
		return (
			<div>
				<h2>{this.props.category} </h2>
				{displayCards(this.props.list)}	 	 
			</div>
		);
	}
}
