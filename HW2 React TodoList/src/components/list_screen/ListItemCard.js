import React, { Component } from 'react'

export class ListItemCard extends Component {

    constructor(props) {
        super(props)

        this.moveUpButton = React.createRef();
        this.moveDownButton = React.createRef();
    }
    
    isCompleted() {
        if (this.props.listItem.completed === true) {
            var isCompleted = "Completed"
        }
        return isCompleted
    }

    isPending() {
        if (this.props.listItem.completed === false) {
            var isCompleted = "Pending"
        }
        return isCompleted
    }

    //test = () => {
        //this.props.displayEditListItem();
        //console.log("Hello World");
    //}

    handleUpButtonClick= (e) => {
        e.stopPropagation();

        if (this.props.itemIndex != 0) {
            this.props.moveUpTodoListItem();
        }
    }

    handleDownButtonClick = (e) => {
        e.stopPropagation();
    }

    handleDeleteButtonClick = (e) => {
        e.stopPropagation();
        this.props.deleteTodoListItem();
    }
    
    render() {
        return (
            <div className='list_item_card'
                onClick={this.props.displayEditListItem}
            >
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed'>
                    {this.isCompleted()}
                </div>
                <div className='list_item_card_not_completed'>
                    {this.isPending()}
                </div>
                <div className="list_item_card_button_div">
                    <button id="list_item_card_button_move_up" className="list_item_card_button move_up" type="button" onClick={this.handleUpButtonClick}/>
                    <button id="list_item_card_button_move_down" className="list_item_card_button move_down" type="button" onClick={this.handleDownButtonClick}/>
                    <button id="list_item_card_button_delete" className="list_item_card_button delete" type="button" onClick={this.handleDeleteButtonClick}/>
                </div>
            </div>
        )
    }
}

export default ListItemCard
