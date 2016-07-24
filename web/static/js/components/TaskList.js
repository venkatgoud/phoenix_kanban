import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, Button, Col, Checkbox, ControlLabel}
        from 'react-bootstrap';


export default class TaskList extends Component {

	displayTasks = (tasks) => {

	return tasks.map(function(task, taskIndex){
		return (
			<Checkbox 
					className="checklist__task"
					key={task.id} 
					defaultChecked={task.done}
					onChange={this.props.taskCallbacks.toggle.bind(null,this.props.cardId,task.id, taskIndex)}
					>
					{task.name}
					<a href="#" 
						className="checklist__task--remove" 
						onClick={this.props.taskCallbacks.delete.bind(null,this.props.cardId, task.id, taskIndex)}
					/>	 
			</Checkbox>)
		}.bind(this))
	}

	checkInputKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.taskCallbacks.add(this.props.cardId, event.target.value);
			event.target.value = '';
		}
	}

	render() {
		return (
			<div className="checklist">
				<FormGroup> 
					{this.displayTasks(this.props.list)} 
					<FormControl
							className="checklist--add-task"
							placeholder="Type then hit enter to add task"
							onKeyPress={this.checkInputKeyPress}
	            type="text"/>                      
        </FormGroup> 
			</div>
		);
	}
}

TaskList.propTypes = {
  id: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

