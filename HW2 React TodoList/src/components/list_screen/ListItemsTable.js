import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {

    render() {
        return (
            <div id="list_items_container" className="list_item_header_card">
                <div id="list_items_second_container">
                <div className="list_item_header_card"></div>
                <div className="list_item_task_header" onClick={this.props.sortByTask}>Task</div>
                <div className="list_item_due_date_header" onClick={this.props.sortByDueDate}>Due Date</div>
                <div className="list_item_status_header" onClick={this.props.sortByStatus}>Status</div>
                {
                    this.props.todoList.items.map((todoItem, index)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            displayEditListItem={() => this.props.displayEditListItem(index)}
                            itemIndex={index}

                            todoListItemsLength={this.props.todoListItemsLength}
                            moveUpTodoListItem={() => this.props.moveUpTodoListItem(index)}
                            moveDownTodoListItem={() => this.props.moveDownTodoListItem(index)}
                            deleteTodoListItem={() => this.props.deleteTodoListItem(index)}
                            />
                    ))
                }
                <div className="new_item_button_div">
                    <button className="new_item_button" onClick={this.props.displayNewListItem}></button>
                </div>
                </div>
            </div>
        )
    }
}

export default ListItemsTable
