import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import { jsTPS, NameChange_Transaction, OwnerChange_Transaction, ListItemOrderChange_Transaction, ListItemRemoval_Transaction, ListItemEdit_Transaction } from './jsTPS'
//import jsTPS from './jsTPS'
//import NameChange_Transaction from './jsTPS'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    indexToEdit: null,
    taskIncreasing: false,
    dueDateIncreasing: false,
    statusIncreasing: false,
    transactionsStack: new jsTPS()
  }

  goHome = () => {
    let indexOfList = this.state.todoLists.indexOf(this.state.currentList)
    if (indexOfList >= 0) {
      this.state.todoLists.splice(indexOfList, 1)
    }
    this.state.todoLists.unshift(this.state.currentList)
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  updateListName(newName) {
    let nameTransaction = new NameChange_Transaction(this.state.currentList, newName)
    this.state.transactionsStack.addTransaction(nameTransaction);
  }

  updateListOwner(newOwner) {
    let ownerTransaction = new OwnerChange_Transaction(this.state.currentList, newOwner);
    this.state.transactionsStack.addTransaction(ownerTransaction);
  }

  undoTransaction() {
    let transactionType = null;
    if (this.state.transactionsStack.mostRecentTransaction >= 0) {
      transactionType = this.state.transactionsStack.transactions[this.state.transactionsStack.mostRecentTransaction].transactionType
    }
    this.state.transactionsStack.undoTransaction();
    console.log(transactionType)

    if (transactionType === "nameChange") {
      document.getElementById("list_name_textfield").value = this.state.currentList.name;
    } else if (transactionType === "ownerChange") {
      document.getElementById("list_owner_textfield").value = this.state.currentList.owner;
    } else if (transactionType === "listItemOrderChange") {
      this.loadList(this.state.currentList);
    } else if (transactionType === "listItemRemove") {
      this.loadList(this.state.currentList);
    } else if (transactionType === "listItemEdit") {
      this.loadList(this.state.currentList);
    }
  }

  redoTransaction() {
    this.state.transactionsStack.doTransaction();
    let transactionType = null;
    if (this.state.transactionsStack.mostRecentTransaction >= 0) {
      transactionType = this.state.transactionsStack.transactions[this.state.transactionsStack.mostRecentTransaction].transactionType
    }

    if (transactionType === "nameChange") {
      document.getElementById("list_name_textfield").value = this.state.currentList.name;
    } else if (transactionType === "ownerChange") {
      document.getElementById("list_owner_textfield").value = this.state.currentList.owner;
    } else if (transactionType === "listItemOrderChange") {
      this.loadList(this.state.currentList);
    } else if (transactionType === "listItemRemove") {
      this.loadList(this.state.currentList);
    } else if (transactionType === "listItemEdit") {
      this.loadList(this.state.currentList);
    }
  }

  // Delete current TodoList
  delTodo = () => {
    this.setState({ todoLists: [...this.state.todoLists.filter(todoList => todoList.key !== this.state.currentList.key)]})
    this.goHome()
  }

  createTodoList = () => {
    let todoList = {
      "key": this.getNextAvailableTodoListKey(),
      "name": "Unknown",
      "Owner": "",
      "items": []
    }

    this.setState({ todoLists: [...this.state.todoLists, todoList]})
    this.loadList(todoList)
  }

  getNextAvailableTodoListKey = () => {
    let keyLists = []
    for (let i = 0; i < this.state.todoLists.length; i++) {
      keyLists.push(this.state.todoLists[i].key)
    }

    for (let i = 0; i < keyLists.length; i++) {
      if (!(keyLists.includes(i))) {
        return i
      }
    }

    return keyLists.length;
  }

  getNextAvailableTodoListItemKey = () => {
    let keyLists = []
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      keyLists.push(this.state.currentList.items[i].key)
    }

    for (let i = 0; i < keyLists.length; i++) {
      if (!(keyLists.includes(i))) {
        return i
      }
    }

    return keyLists.length;
  }

  createNewTodoListItem(newItem) {
    newItem.key = this.getNextAvailableTodoListItemKey()
    this.state.currentList.items.push(newItem)
    this.loadList(this.state.currentList)

    console.log(this.state.currentList)
  }

  editTodoListItem(newItem, itemIndex) {
    newItem.key = this.state.currentList.items[itemIndex].key

    let editTodoItemTransaction = new ListItemEdit_Transaction(this.state.currentList, itemIndex, newItem);
    this.state.transactionsStack.addTransaction(editTodoItemTransaction);
    this.loadList(this.state.currentList);
  }

  deleteTodoListItem(index) {
    let deleteTodoItemTransaction = new ListItemRemoval_Transaction(this.state.currentList, index);
    this.state.transactionsStack.addTransaction(deleteTodoItemTransaction);
    this.loadList(this.state.currentList)
  }

  moveUpTodoListItem(index1, index2) {
    let changeTodoItemOrderTransaction = new ListItemOrderChange_Transaction(this.state.currentList, index1, index2);
    this.state.transactionsStack.addTransaction(changeTodoItemOrderTransaction);

    this.setState({taskIncreasing: false})
    this.setState({dueDateIncreasing: false})
    this.setState({statusIncreasing: false})
    this.loadList(this.state.currentList)
  }

  moveDownTodoListItem(index1, index2) {
    let changeTodoItemOrderTransaction = new ListItemOrderChange_Transaction(this.state.currentList, index1, index2);
    this.state.transactionsStack.addTransaction(changeTodoItemOrderTransaction);

    this.setState({taskIncreasing: false})
    this.setState({dueDateIncreasing: false})
    this.setState({statusIncreasing: false})
    this.loadList(this.state.currentList)
  }

  sortByTask() {
    if (this.state.taskIncreasing === false) {
      this.state.currentList.items.sort(function(item1, item2) {
        if (item1.description < item2.description) {
          return -1
        } else if (item1.description > item2.description) {
          return 1
        } else {
          return 0
        }
      })
      this.setState({taskIncreasing: true})
    } else {
      this.state.currentList.items.sort(function(item1, item2) {
        return 1
      })
      this.setState({taskIncreasing: false})
    }

    this.loadList(this.state.currentList)
  }

  sortByDueDate() {
    if (this.state.dueDateIncreasing === false) {
      this.state.currentList.items.sort(function(item1, item2) {
        if (item1.due_date < item2.due_date) {
          return -1
        } else if (item1.due_date > item2.due_date) {
          return 1
        } else {
          return 0
        }
      })
      this.setState({dueDateIncreasing: true})
    } else {
      this.state.currentList.items.sort(function(item1, item2) {
        return 1
      })
      this.setState({dueDateIncreasing: false})
    }

    this.loadList(this.state.currentList)
  }

  sortByStatus() {
    if (this.state.statusIncreasing === false) {
      this.state.currentList.items.sort(function(item1, item2) {
        if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
      })
      this.setState({statusIncreasing: true})
    } else {
      this.state.currentList.items.sort(function(item1, items2) {
        return 1
      })
      this.setState({statusIncreasing: false})
    }

    this.loadList(this.state.currentList)
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        newTodoList={() => this.createTodoList()}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          deleteList={this.delTodo.bind(this)}
          updateListName={(newName) => this.updateListName(newName)}
          updateListOwner={(newOwner) => this.updateListOwner(newOwner)}

          undoTransaction={() => this.undoTransaction()}
          redoTransaction={() => this.redoTransaction()}

          displayNewListItem={
            () => {
              this.setState({createNewList: true})
              this.setState({currentScreen: AppScreen.ITEM_SCREEN})
            }
          }
          displayEditListItem={
            (index) => {
              this.setState({createNewList: false})
              this.setState({currentScreen: AppScreen.ITEM_SCREEN})
              this.setState({indexToEdit: index})
            }
          }

          todoListItemsLength={this.state.currentList.items.length}
          moveUpTodoListItem={(index) => this.moveUpTodoListItem(index, index-1)}
          moveDownTodoListItem={(index) => this.moveDownTodoListItem(index, index+1)}
          deleteTodoListItem={(index) => this.deleteTodoListItem(index)}
          
          sortByTask={() => this.sortByTask()}
          sortByDueDate={() => this.sortByDueDate()}
          sortByStatus={() => this.sortByStatus()}

          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
        hideNewListScreen={() => this.loadList(this.state.currentList)}
        createOrEditTodoListItem={
            (itemInfo) => (this.state.createNewList ? this.createNewTodoListItem(itemInfo) : this.editTodoListItem(itemInfo, this.state.indexToEdit))
        }/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;