import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, Checkbox, ControlLabel}
        from 'react-bootstrap';

function displayTasks(tasks){

	return tasks.map(function(task){
		return <Checkbox 
					className="checklist__task"
					key={task.id} 
					defaultChecked={task.done}
					>
					{task.name}
					<a href="#" className="checklist__task--remove" />	 
		</Checkbox>
	})

}

export default class TaskList extends Component {
	render() {
		return (
			<div className="checklist">
				<FormGroup> 
					{displayTasks(this.props.list)} 
					<FormControl
							placeholder="Type then hit enter to add task"
	            type="text"/>                      
        </FormGroup> 
			</div>
		);
	}
}
