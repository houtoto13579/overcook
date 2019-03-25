import React, { Component } from 'react';
class Friend extends Component {
  constructor(){
    super();
    this.createList = this.createList.bind(this);
    this.clickBlock=this.clickBlock.bind(this);
  }
  clickBlock(name){ 
    this.props.removeFriend(name);
  }
  clickNew(){
    this.props.addFriend();
  }
  createList(friend){
    let blockType = "friend-block-container"
    if (friend==="New Friend"){
      return (
        <div 
          className="new-block-container"
          key={`new-${friend}`} 
          onClick={(e)=>{this.clickNew()}}>        
          <div className="friend-block"> 
            {friend}
          </div>
        </div>
      );
    }
    else{
      return (
        <div 
          className={blockType} 
          key={`friend-${friend}`} 
          onClick={(e)=>{this.clickBlock(friend)}}>        
          <div className="friend-block"> 
            {friend}
          </div>
        </div>
      );
    }
    
  }
  render() {
    var listArr = this.props.friends;
    var listArrRender = listArr.map(this.createList);
    return (
        <div>
          <div className="cooking-with-title">
            Cooking with:
          </div>
            {listArrRender}
        </div>
    );
  }
}

export default Friend;