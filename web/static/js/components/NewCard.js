import React, { Component, PropTypes } from 'react'; 
import CardForm from './CardForm';

class NewCard extends Component {

	handleChange = (field, value) => {		 
		this.setState({[field] : value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.cardCallbacks.addCard(this.state);
		// this.props.history.pushState(null,'/');
		this.context.router.push('/')
	}

	handleClose  = (event) => {
		// this.props.history.pushState(null,'/');
		this.context.router.push('/')
	}

	componentWillMount() {
		this.setState({
			id: Date.now(),
			title: '',
			description: '',
			status: 'todo',
			color: '#c9c9c9',
			tasks: []
		});
	}

	render() {
		return (
			 <CardForm 
			 	draftCard={this.state}
			 	buttonLabel = 'Create Card'
			 	handleChange = {this.handleChange}
			 	handleSubmit = {this.handleSubmit}
			 	handleClose  = {this.handleClose} />
		);
	}
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object,
};

NewCard.contextTypes = {
  router: React.PropTypes.object
};

export default NewCard;
