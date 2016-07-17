import React, { Component } from 'react';
import TaskList from './TaskList'

export default class Card extends Component {
	render() {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<p> {this.props.description} </p>	
				<p> {this.props.status} </p>			
				<TaskList list={this.props.tasks}/>
			</div>
		);
	}
}
