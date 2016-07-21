import React, { Component, PropTypes } from 'react';
import Card from './Card'
import { Col } from 'react-bootstrap';



export default class CardList extends Component {

	displayCards = (cards) => {
		return cards.map(function(card){
			return <Card 
				title={card.title}
				description={card.description}
				status={card.status}
				tasks={card.tasks}
				color={card.color}
				key={card.id}
				id={card.id}
				taskCallbacks={this.props.taskCallbacks}
			/>	 	
		}.bind(this));	
	}

	render() {
		return (
			<div className='list'>
				<h1>{this.props.category} </h1>
				{this.displayCards(this.props.list)}	 	 
			</div>
		);
	}
}

CardList.propTypes = {
	category: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
}
