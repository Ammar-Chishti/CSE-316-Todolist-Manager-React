import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div id="todo_edit">
                <div id="todo_edit_home" class="todo_edit_home">
                    <span>Item</span>
                    <br />
                    <br />
                    <br />
                    <span>Description:</span>
                    <input type="text" id="description_input" class="edit_home_object"></input>
                    <br />
                    <br />
                    <br />
                    <span>Assigned To:</span>
                    <input type="text" id="assigned_to_input" class="edit_home_object"></input>
                    <br />
                    <br />
                    <br />
                    <span>Due Date:</span>
                    <input type="date" id="due_date_input" class="edit_home_object"></input>
                    <br />
                    <br />
                    <br />
                    <span>Completed</span>
                    <input type="checkbox" id="checkbox_input" class="edit_home_checkbox"></input>
                    <br />
                    <br />
                    <br />
                    <button type="button" id="todo_edit_home_submit" class="todo_edit_button">Submit</button>
                    <button type="button" id="todo_edit_home_cancel" class="todo_edit_button" onClick={this.props.hideNewListScreen}>Cancel</button>
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
