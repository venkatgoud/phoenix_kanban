import React, { Component } from 'react';
import TaskList from './TaskList'

export default class Card extends Component {

	constructor(props){
		super(props);

		this.state = {
			showDetails : false
		}
	}

	toggleDetails = () => {
		this.setState({showDetails: !this.state.showDetails})
	}

	render() {
		let cardDetails = null;
		if (this.state.showDetails){
			cardDetails = <div className='card_details'>				 
				<p> {this.props.description} </p>					 
				<TaskList cardId={this.props.id} list={this.props.tasks}/>
			</div>
		}
		return  <div className='card'>
				<div 
					className='card__title'
					onClick = {this.toggleDetails}
					>
					{this.props.title}
				</div>
				{cardDetails} 
			</div>
	}
}
