import React, { Component } from 'react';

export default class Main extends Component {
	render() {
		return (
			<div id="main_container" className="container">
				{this.props.children}
			</div>
		);
	}
}
