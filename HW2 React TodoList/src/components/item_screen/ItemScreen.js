import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: null,
            description: "",
            due_date: "",
            assigned_to: "",
            completed: false
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleAssignedToChange = this.handleAssignedToChange.bind(this)
        this.handleDueDateChange = this.handleDueDateChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    }

    handleAssignedToChange = (e) => {
        this.setState({assigned_to: e.target.value})
    }

    handleDueDateChange = (e) => {
        this.setState({due_date: e.target.value})
    }

    handleStatusChange = (e) => {
        this.setState({completed: e.target.checked})
    }

    render() {
        return (
            <div id="todo_edit">
                {this.props.currentScreen}
                {this.props.currentList}
                <div id="todo_edit_home" className="todo_edit_home">
                    <span>Item</span>
                    <br />
                    <br />
                    <br />
                    <span>Description:</span>
                    <input type="text" id="description_input" className="edit_home_object" onChange={this.handleDescriptionChange}></input>
                    <br />
                    <br />
                    <br />
                    <span>Assigned To:</span>
                    <input type="text" id="assigned_to_input" className="edit_home_object" onChange={this.handleAssignedToChange}></input>
                    <br />
                    <br />
                    <br />
                    <span>Due Date:</span>
                    <input type="date" id="due_date_input" className="edit_home_object" onChange={this.handleDueDateChange}></input>
                    <br />
                    <br />
                    <br />
                    <span>Completed</span>
                    <input type="checkbox" id="checkbox_input" className="edit_home_checkbox" onChange={this.handleStatusChange}></input>
                    <br />
                    <br />
                    <br />
                    <button type="button" id="todo_edit_home_submit" className="todo_edit_button" onClick={() => this.props.createOrEditTodoListItem(this.state)}>Submit</button>
                    <button type="button" id="todo_edit_home_cancel" className="todo_edit_button" onClick={this.props.hideNewListScreen}>Cancel</button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
