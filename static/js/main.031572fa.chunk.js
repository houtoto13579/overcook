(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(34)},18:function(e,t,n){},19:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(11),s=n.n(r),c=(n(18),n(5)),o=n(6),d=n(8),l=n(7),u=n(9),h=n(1),m=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(l.a)(t).call(this))).createList=e.createList.bind(Object(h.a)(Object(h.a)(e))),e.clickBlock=e.clickBlock.bind(Object(h.a)(Object(h.a)(e))),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"clickBlock",value:function(e,t,n,i){this.props.deleteMode?!0===i&&this.props.removeIngredient(n):this.props.updateQueue(n)}},{key:"clickAdd",value:function(){this.props.addIngredient()}},{key:"createList",value:function(e,t){var n=this,i=e.chosen?{border:"4px solid #3d3d3d"}:{border:"0px solid #3d3d3d"};return a.a.createElement("div",{className:"ingredient-block-container",key:"ingredient-".concat(e.name),onClick:function(i){n.clickBlock(i,e.id,e.name,t)}},a.a.createElement("div",{className:"ingredient-block",style:i},a.a.createElement("div",{className:"ingredient-block-name"},e.name)))}},{key:"render",value:function(){var e=this,t=this.props.ingredients,n=this.props.friendIngredients,i=t.map(function(t){return e.createList(t,!0)}),r=n.map(function(t){return e.createList(t,!1)}),s=this.props.deleteMode?"remove-ingredient-clicked":"remove-ingredient",c=this.props.deleteMode?{border:"3px solid #c20616"}:{};return a.a.createElement("div",null,a.a.createElement("div",{className:"ingredient-console"},a.a.createElement("div",{className:"add-ingredient",onClick:function(t){return e.clickAdd()}},"Add ingredient"),a.a.createElement("div",{className:s,onClick:function(t){return e.props.changeDeleteMode()}},"Remove ingredient")),a.a.createElement("div",{className:"user-ingredients-list",style:c},a.a.createElement("div",null,"Your ingredients:"),i),a.a.createElement("div",{className:"friend-ingredients-list"},a.a.createElement("div",null,"Friends' ingredients:"),r))}}]),t}(i.Component),p=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(l.a)(t).call(this))).createList=e.createList.bind(Object(h.a)(Object(h.a)(e))),e.clickBlock=e.clickBlock.bind(Object(h.a)(Object(h.a)(e))),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"clickBlock",value:function(e){this.props.removeFriend(e)}},{key:"clickNew",value:function(){this.props.addFriend()}},{key:"createList",value:function(e){var t=this;return"New Friend"===e?a.a.createElement("div",{className:"new-block-container",key:"new-".concat(e),onClick:function(e){t.clickNew()}},a.a.createElement("div",{className:"friend-block"},e)):a.a.createElement("div",{className:"friend-block-container",key:"friend-".concat(e),onClick:function(n){t.clickBlock(e)}},a.a.createElement("div",{className:"friend-block"},e))}},{key:"render",value:function(){var e=this.props.friends.map(this.createList);return a.a.createElement("div",null,a.a.createElement("div",{className:"cooking-with-title"},"Cooking with:"),e)}}]),t}(i.Component),v=(n(19),n(4)),f=n.n(v),g=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(l.a)(t).call(this))).state={ingredients:[],friendIngredients:[],queue:[],user:"",users:["New Friend"],userAlert:null,count:0,deleteMode:!1},e.inputUser=e.inputUser.bind(Object(h.a)(Object(h.a)(e))),e.onRecieveUser=e.onRecieveUser.bind(Object(h.a)(Object(h.a)(e))),e.hideUserAlert=e.hideUserAlert.bind(Object(h.a)(Object(h.a)(e))),e.fetchIngredients=e.fetchIngredients.bind(Object(h.a)(Object(h.a)(e))),e.updateQueue=e.updateQueue.bind(Object(h.a)(Object(h.a)(e))),e.updateRecipe=e.updateRecipe.bind(Object(h.a)(Object(h.a)(e))),e.addFriend=e.addFriend.bind(Object(h.a)(Object(h.a)(e))),e.onRecieveFriend=e.onRecieveFriend.bind(Object(h.a)(Object(h.a)(e))),e.removeFriend=e.removeFriend.bind(Object(h.a)(Object(h.a)(e))),e.addIngredient=e.addIngredient.bind(Object(h.a)(Object(h.a)(e))),e.onRecieveIngredient=e.onRecieveIngredient.bind(Object(h.a)(Object(h.a)(e))),e.removeIngredient=e.removeIngredient.bind(Object(h.a)(Object(h.a)(e))),e.changeDeleteMode=e.changeDeleteMode.bind(Object(h.a)(Object(h.a)(e))),e.apiUrl="https://18.220.42.114:8000/",e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.inputUser()}},{key:"checkStatus",value:function(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}},{key:"inputUser",value:function(){this.setState({userAlert:a.a.createElement(f.a,{input:!0,showCancel:!0,title:"Name",required:!0,validationMsg:"You must enter your name!",onConfirm:this.onRecieveUser,onCancel:this.hideAlert})})}},{key:"onRecieveUser",value:function(e){this.setState({user:e,userAlert:a.a.createElement(f.a,{success:!0,title:"Finish",onConfirm:this.hideUserAlert})})}},{key:"hideUserAlert",value:function(){this.setState({userAlert:null},this.fetchIngredients)}},{key:"updateQueue",value:function(e){for(var t=this,n=[],i=this.state.ingredients,a=this.state.friendIngredients,r=0;r<i.length;++r)if(i[r].name===e){i[r].chosen=!i[r].chosen;break}for(var s=0;s<i.length;++s)i[s].chosen&&n.push(i[s].name);for(var c=0;c<a.length;++c)if(a[c].name===e){a[c].chosen=!a[c].chosen;break}for(var o=0;o<a.length;++o)a[o].chosen&&n.push(a[o].name);this.setState({queue:n,ingredients:i,fetchIngredients:a},function(){t.updateRecipe()})}},{key:"addFriend",value:function(){this.setState({userAlert:a.a.createElement(f.a,{input:!0,showCancel:!0,title:"You are cooking with:",required:!0,validationMsg:"You must enter your friend!",onConfirm:this.onRecieveFriend,onCancel:this.hideAlert})})}},{key:"onRecieveFriend",value:function(e){var t=this.state.users;t.unshift(e),this.setState({users:t,userAlert:a.a.createElement(f.a,{success:!0,title:"Finish",onConfirm:this.hideUserAlert})},this.fetchIngredients())}},{key:"removeFriend",value:function(e){var t=this.state.users,n=t.indexOf(e);t.splice(n,1),this.setState({users:t},this.fetchIngredients())}},{key:"updateRecipe",value:function(){console.log("update the recipe and sent to the server"),console.log(this.state.queue)}},{key:"fetchIngredients",value:function(){var e=this,t=Object.assign([],this.state.users);t.pop(),fetch("".concat(this.apiUrl,"queryIngredients"),{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user:this.state.user,friends:t})}).then(this.checkStatus).then(function(e){return e.json()}).then(function(t){console.log(t.data.own_ingredients),e.setState({ingredients:t.data.own_ingredients,friendIngredients:t.data.friends_ingredients})}).catch(function(t){console.log("get list fail..."),console.log(t),e.setState({recipeList:[]})})}},{key:"addIngredient",value:function(){console.log("add ingredient"),this.setState({userAlert:a.a.createElement(f.a,{input:!0,showCancel:!0,title:"Add ingredient:",required:!0,validationMsg:"You must enter ingredient!",onConfirm:this.onRecieveIngredient,onCancel:this.hideAlert})})}},{key:"onRecieveIngredient",value:function(e){var t=this,n=[];n.push(e),fetch("".concat(this.apiUrl,"insertIngredients"),{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user:this.state.user,ingredients:n})}).then(this.checkStatus).then(function(e){return e.json()}).then(function(e){t.setState({userAlert:a.a.createElement(f.a,{success:!0,title:"Finish",onConfirm:t.hideUserAlert})},function(){t.fetchIngredients()})}).catch(function(e){console.log("get list fail..."),console.log(e),t.setState({recipeList:[]})})}},{key:"removeIngredient",value:function(e){var t=this,n=[];n.push(e),fetch("".concat(this.apiUrl,"deleteIngredients"),{method:"delete",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user:this.state.user,ingredients:n})}).then(this.checkStatus).then(function(e){return e.json()}).then(function(e){t.fetchIngredients()}).catch(function(e){console.log("get list fail..."),console.log(e)})}},{key:"changeDeleteMode",value:function(){var e=this.state.deleteMode;this.setState({deleteMode:!e})}},{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},"Overcooked",a.a.createElement("div",{className:"App-header-welcomeuser"},"Welcome, ",this.state.user)),this.state.userAlert,a.a.createElement("div",{className:"cooking-with"},a.a.createElement(p,{friends:this.state.users,removeFriend:this.removeFriend,addFriend:this.addFriend})),a.a.createElement("div",{className:"main-body"},a.a.createElement("div",{className:"ingredients"},a.a.createElement("div",null,a.a.createElement(m,{ingredients:this.state.ingredients,deleteMode:this.state.deleteMode,friendIngredients:this.state.friendIngredients,updateQueue:this.updateQueue,addIngredient:this.addIngredient,removeIngredient:this.removeIngredient,changeDeleteMode:this.changeDeleteMode}))),a.a.createElement("div",{className:"recipe"})))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.031572fa.chunk.js.map