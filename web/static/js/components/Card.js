import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import marked from 'marked';
import TaskList from './TaskList'


let titlePropType = (props, propName, componentName) => {
	if (props[propName]) {
		let value = props[propName];
		if (typeof value !== 'string' || value.length > 80){
			return new Error(
				`${propName} ins ${componentName} is longer than 80 characters`
			)
		}
	}
}

class Card extends Component {

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
				<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}}/>				 				 				 
				<TaskList 
					cardId={this.props.id} 
					taskCallbacks={this.props.taskCallbacks}
					list={this.props.tasks}/>
			</div>
		}

		let sideColor = {
			position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
			backgroundColor: this.props.color
		}

		return  <div className='card'>
				<div style={sideColor}/>	
				<div 
					className={this.state.showDetails ? 'card__title card__title--is-open' : 'card__title'}
					onClick = {this.toggleDetails}
				>
					{this.props.title}
				</div>
				<ReactCSSTransitionGroup transitionName="toggle"
                             transitionEnterTimeout={250}
                         transitionLeaveTimeout={250} >
				{cardDetails} 
				</ReactCSSTransitionGroup>
			</div>
	}
}

Card.propTypes = {
	id: PropTypes.number,
	// title: PropTypes.string.isRequired,
	title: titlePropType,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
}

export default Card
