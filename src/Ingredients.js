import React, { Component } from 'react';
class Ingredients extends Component {
  constructor(){
    super();
    this.createList = this.createList.bind(this);
    this.clickBlock=this.clickBlock.bind(this);
  }
  clickBlock(e,id,name,own){
    //console.log(name)
    if(this.props.deleteMode){
      if(own===true)
        this.props.removeIngredient(name);}
    else
      this.props.updateQueue(name);
  }
  clickAdd(){
    this.props.addIngredient();
  }
  createList(ingredient, own){
    let blockType = "ingredient-block-container"
    var chosenStyle = (ingredient.chosen)? {border:"4px solid #3d3d3d"} : {border:"0px solid #3d3d3d"};
    return (
        <div 
          className={blockType} 
          key={`ingredient-${ingredient.name}`} 
          onClick={(e)=>{this.clickBlock(e,ingredient.id, ingredient.name, own)}}>        
          <div className="ingredient-block" style={chosenStyle}> 
            <div className="ingredient-block-name">
              {ingredient.name}
            </div>
          </div>
        </div>
      )
  }
  render() {
    let listArr = this.props.ingredients;
    let listArr2 = this.props.friendIngredients;
    var listArrRender = listArr.map(x=>this.createList(x,true));
    var listArrRender2 = listArr2.map(x=>this.createList(x,false));
    let removeButtonStyle = (this.props.deleteMode)? "remove-ingredient-clicked" : "remove-ingredient";
    let userIngredientsListStyle = (this.props.deleteMode)? {border: "3px solid #c20616"} : {};
    //console.log(this.props.deleteMode);
    //console.log(removeButtonStyle);
    return (
        <div>
          <div className="ingredient-console">
            <div className="add-ingredient" onClick={(e)=>this.clickAdd()}>
              Add ingredient
            </div>
            <div className= {removeButtonStyle} onClick={(e)=>this.props.changeDeleteMode()}>
              Remove ingredient
            </div>
          </div>
          <div className="user-ingredients-list" style={userIngredientsListStyle}>
            <div>
              Your ingredients:
            </div>
            {listArrRender}
          </div>
          <div className="friend-ingredients-list">
            <div>
              Friends' ingredients:
            </div>
            {listArrRender2}
          </div>
        </div>
    );
  }
}

export default Ingredients;