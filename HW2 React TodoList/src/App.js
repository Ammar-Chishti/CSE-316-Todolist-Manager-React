import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  // Delete current TodoList
  delTodo = () => {
    this.setState({ todoLists: [...this.state.todoLists.filter(todoList => todoList.key !== this.state.currentList.key)]})
    this.goHome()
  }

  // Add a new todoListItem to the current todoList
  createTodoListItem = () => {
    //let newDescription = document.getElementById("description_input").value;
    //let newAssignedTo = document.getElementById("assigned_to_input").value;
    //let newDueDate = document.getElementById("due_date_input").value;
    //let isChecked = document.getElementById("checkbox_input").checked;

    //this.setState({ todoLists: [...this.state.todoLists, 
      
      
      /*{
      "key": 0,
      "name": "Things I am Never Gonna Do",
      "owner": "Rick Astley",
      "items": [
          {
              "key": 0,
              "description": "Give You Up",
              "due_date": "2019-09-30",
              "assigned_to": "Rick",
              "completed": true
          },
          {
              "key": 1,
              "description": "Say Goodbye",
              "due_date": "2019-10-15",
              "assigned_to": "Rick",
              "completed": false
          },
          {
              "key": 2,
              "description": "Make You Cry",
              "due_date": "2019-12-30",
              "assigned_to": "Bob",
              "completed": false
          }
      ]
  }]*///})
    //this.goHome()
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        newTodoList={}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          deleteList={this.delTodo.bind(this)}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
        hideNewListScreen={() => this.goHome()}
        submitNewListScreen={() => this.createTodo()}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;