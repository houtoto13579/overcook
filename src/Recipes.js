import React, { Component } from 'react';
class Recipes extends Component {
  constructor(){
    super();
    this.createList = this.createList.bind(this);
  }
  createTier(recipes,index){
    let listArr = recipes;
    var listArrRender = listArr.map(x=>this.createList(x));
    if(listArr.length!=0)
      
      return (
        <div className="tier-container" key={`Match-${index}`}>        
          <div className="tier-name"> 
            Match Rank: {index}
          </div>
          {listArrRender}
        </div>
      )
  }

  createList(recipe){
    let blockType = "recipe-block-container"
    return (
        <div 
          className={blockType} 
          key={`recipe-${recipe.name}`}
          >        
          <div className="recipe-block"> 
            <div className="recipe-name">
              {recipe.name}
            </div>
            <div className="recipe-pic-container">
              <a href={recipe.link} target="_blank">
                <img className="recipe-pic"
                  src={recipe.img_link}
                  alt={recipe.link}
                />
              </a>
            </div>
          </div>
        </div>
      )
  }
  render() {
    let listArr = this.props.receipes;
    var listArrRender = listArr.map((currElement, index)=>this.createTier(currElement,index));
    return (
        <div>
          <div className="receipe-list">
            {listArrRender}
          </div>
        </div>
    );
  }
}

export default Recipes;