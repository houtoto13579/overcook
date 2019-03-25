import React, { Component } from 'react';
import Ingredients from './Ingredients.js';
import Friend from './Friend.js'
import './App.css';
import SweetAlert from 'react-bootstrap-sweetalert';

class App extends Component {
  constructor(){
    super();
    this.state={
      ingredients:[],
      friendIngredients:[],
      queue:[],
      user: '',
      users: ['New Friend'],
      userAlert: null,
      count: 0,
      deleteMode: false,
    }
    this.inputUser = this.inputUser.bind(this);
    this.onRecieveUser = this.onRecieveUser.bind(this);
    
    this.hideUserAlert = this.hideUserAlert.bind(this);
    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.updateQueue = this.updateQueue.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);

    this.addFriend = this.addFriend.bind(this);
    this.onRecieveFriend = this.onRecieveFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);

    this.addIngredient = this.addIngredient.bind(this);
    this.onRecieveIngredient = this.onRecieveIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.changeDeleteMode = this.changeDeleteMode.bind(this);

    this.apiUrl="http://18.220.42.114:8000/";
  }
  componentDidMount(){
    this.inputUser();
    
    //this.fetchIngredients();
  }
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  inputUser(){
    this.setState({userAlert:(<SweetAlert
      input
      showCancel
      title="Name"
      required
      validationMsg="You must enter your name!"
      onConfirm={this.onRecieveUser}
      onCancel={this.hideAlert}
      />)
    });
  }
  onRecieveUser(value){
    this.setState({user:value, userAlert:(<SweetAlert
      success
      title="Finish"
      onConfirm={this.hideUserAlert}
    />)});
  }
  

  hideUserAlert(){
    this.setState({userAlert:null},this.fetchIngredients);
  }
  updateQueue(name){
    let q = []
    let ing = this.state.ingredients;
    let friendIng = this.state.friendIngredients;
    for(let i=0; i<ing.length; ++i){
      if(ing[i].name===name){
        ing[i].chosen=!ing[i].chosen;
        break;
      }
    }
    //console.log(name)
    for(let i=0; i<ing.length; ++i){
      if(ing[i].chosen)
        q.push(ing[i].name)
    }

    for(let i=0; i<friendIng.length; ++i){
      if(friendIng[i].name===name){
        friendIng[i].chosen=!friendIng[i].chosen;
        break;
      }
    }
    for(let i=0; i<friendIng.length; ++i){
      if(friendIng[i].chosen)
        q.push(friendIng[i].name)
    }

    this.setState({queue:q, ingredients:ing, fetchIngredients:friendIng}, ()=>{this.updateRecipe()});
  }
  addFriend(){
    this.setState({userAlert:(<SweetAlert
      input
      showCancel
      title="You are cooking with:"
      required
      validationMsg="You must enter your friend!"
      onConfirm={this.onRecieveFriend}
      onCancel={this.hideAlert}
      />)
    });
  }
  onRecieveFriend(value){
    let users = this.state.users;
    users.unshift(value)
    this.setState({users, userAlert:(<SweetAlert
      success
      title="Finish"
      onConfirm={this.hideUserAlert}
    />)},this.fetchIngredients());
  }
  removeFriend(name){
    let users = this.state.users;
    var index = users.indexOf(name);
    users.splice(index,1)
    this.setState({users,},this.fetchIngredients());
  }
  updateRecipe(){
    console.log('update the recipe and sent to the server');
    console.log(this.state.queue);
  }
  fetchIngredients(){
    var friends= Object.assign([],this.state.users);
    friends.pop()
    fetch(`${this.apiUrl}queryIngredients`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user":this.state.user,
        "friends":friends,
      }),
    }).then(this.checkStatus)
    .then(response=>response.json())
    .then(resObj=>{
      console.log((resObj.data).own_ingredients)
      this.setState({ingredients:(resObj.data).own_ingredients, friendIngredients:(resObj.data).friends_ingredients});
    })
    .catch(error=>{
        console.log('get list fail...')
        console.log(error);
        this.setState({
          recipeList: []
      })
    });
    
    /*
    let data = [{
      name: "egg",
      chosen: false
    }, {
      name: "ham",
      chosen: false
    }]
    let data2 = [{
      name: "toast",
      chosen: false
    }, {
      name: "milk",
      chosen: false
    }]
    
    this.setState({ingredients:data,friendIngredients:data2});
    */
  }


  //ingredients:
  addIngredient(){
    console.log("add ingredient");
    this.setState({userAlert:(<SweetAlert
      input
      showCancel
      title="Add ingredient:"
      required
      validationMsg="You must enter ingredient!"
      onConfirm={this.onRecieveIngredient}
      onCancel={this.hideAlert}
      />)
    });
  }
  onRecieveIngredient(value){
    let ingredients = [];
    ingredients.push(value)
    fetch(`${this.apiUrl}insertIngredients`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user":this.state.user,
        "ingredients":ingredients,
      }),
    }).then(this.checkStatus)
    .then(response=>response.json())
    .then(resObj=>{
      this.setState({userAlert:(<SweetAlert
        success
        title="Finish"
        onConfirm={this.hideUserAlert}
      />)},()=>{this.fetchIngredients()});
    })
    .catch(error=>{
        console.log('get list fail...')
        console.log(error);
        this.setState({
          recipeList: []
      })
    });
  }
  removeIngredient(name){
    let ingredients = [];
    ingredients.push(name)
    fetch(`${this.apiUrl}deleteIngredients`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user":this.state.user,
        "ingredients":ingredients,
      }),
    }).then(this.checkStatus)
    .then(response=>response.json())
    .then(resObj=>{
      this.fetchIngredients();
    })
    .catch(error=>{
      console.log('get list fail...')
      console.log(error);
    });
  }
  changeDeleteMode(){
    let d = this.state.deleteMode;
    this.setState({deleteMode:!d});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Overcooked
          <div className="App-header-welcomeuser">
            Welcome, {this.state.user}
          </div>
        </header>
        {this.state.userAlert}
        <div className="cooking-with">

          <Friend
            friends = {this.state.users}
            removeFriend = {this.removeFriend}
            addFriend = {this.addFriend}
          >
          </Friend>
        </div>
        <div className="main-body">
          <div className="ingredients">
            <div>
              <Ingredients
                ingredients={this.state.ingredients}
                deleteMode = {this.state.deleteMode}
                friendIngredients={this.state.friendIngredients}
                updateQueue={this.updateQueue}
                addIngredient={this.addIngredient}
                removeIngredient={this.removeIngredient}
                changeDeleteMode = {this.changeDeleteMode}
              ></Ingredients>
            </div>
          </div>
          <div className="recipe">
            
          </div>
        </div>
      </div>
    );
  }
}
export default App;
