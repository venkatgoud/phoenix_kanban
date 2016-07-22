import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';

class EditCard extends Component {

	handleChange = (field, value) => {
		//TODO - interesting use of []
		this.setState({[field] : value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.cardCallbacks.updateCard(this.state);
		this.context.router.push('/');
	}

	handleClose  = (event) => {		 
		this.context.router.push('/');
	}

	componentWillMount() {
		let card = this.props.cards.find((card)=>card.id == this.props.params.card_id); 
		this.setState({...card});		 
	}

	render() {
		return (
			 <CardForm 
			 	draftCard = {this.state}
			 	buttonLabel = 'Edit Card'
			 	handleChange = {this.handleChange}
			 	handleSubmit = {this.handleSubmit}
			 	handleClose  = {this.handleClose} />
		);
	}
}

EditCard.contextTypes = {
  router: React.PropTypes.object
};

EditCard.propTypes = {
  cardCallbacks: PropTypes.object,
};


export default EditCard;
