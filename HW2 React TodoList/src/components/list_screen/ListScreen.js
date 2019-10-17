import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import { ModalYesNoDialog } from './ModalYesNoDialog';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            return this.props.todoList.owner;
        }
    }
    handleChangeName = (e) => {
        var homeButton = document.getElementById("list_heading");
        if (e.target.value === "") {
            homeButton.style.pointerEvents = "none"
        } else {
            homeButton.style.pointerEvents = "auto";
            this.props.todoList.name = e.target.value
        }
        
    }
    handleChangeOwner = (e) => {
        this.props.updateListOwner(e.target.value);
        //this.props.todoList.owner = e.target.value
    }
    undoTransaction = (e) => {
        if (e.ctrlKey && e.keyCode === 90) {
            this.props.undoTransaction();
        }
    }
    render() {
        return (
            <div id="todo_list" onKeyDown ={(e) => this.undoTransaction(e)} tabIndex="0">
                <ListHeading goHome={this.props.goHome} />
                <ModalYesNoDialog deleteList={this.props.deleteList}/>
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()}
                            type="text" 
                            id="list_name_textfield" 
                            onChange={this.handleChangeName}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield"
                            onChange={this.handleChangeOwner}/>
                    </div>
                </div>
                <ListItemsTable 
                todoList={this.props.todoList} 
                displayNewListItem={this.props.displayNewListItem}
                displayEditListItem={(index) => this.props.displayEditListItem(index)}

                sortByTask={this.props.sortByTask}
                sortByDueDate={this.props.sortByDueDate}
                sortByStatus={this.props.sortByStatus}

                todoListItemsLength={this.props.todoListItemsLength}
                moveUpTodoListItem={(index) => this.props.moveUpTodoListItem(index)}
                moveDownTodoListItem={(index) => this.props.moveDownTodoListItem(index)}
                deleteTodoListItem={(index) => this.props.deleteTodoListItem(index)}
                
                />
            </div>
        )
    }
}

export default ListScreen
