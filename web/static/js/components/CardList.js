import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { Col } from 'react-bootstrap';
import Card from './Card'
import constants from '../constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class CardList extends Component {

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
				cardCallbacks={this.props.cardCallbacks}
			/>	 	
		}.bind(this));	
	}

	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(
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
	taskCallbacks: PropTypes.object,
	cardCallbacks: PropTypes.object,
	connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(CardList);
