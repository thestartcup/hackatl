import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var apiRoot = 'http://localhost:8080'

var tagList = [
{"tag": "Marketing", "ind": "0"},
{"tag":"Business", "ind": "1"},
{"tag":"Graphic Design", "ind": "2"},
{"tag":"Programmer", "ind": "3"},
{"tag":"Engineer", "ind": "4"},
{"tag":"Investor", "ind": "5"}

]

class MenuBar extends Component {

    getInitialState () {
        return { focused: 0 };
    }

    clicked (index) {

        // The click handler will update the state with
        // the index of the focused menu entry

        this.setState({focused: index});
    }

    render () {

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){

                    var style = '';
                    console.log(self)
                    if(self.state && self.state.focused == index){
                        style = 'focused';
                    }

                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[(this.state && this.state.focused) || 0]}</p>
            </div>
        );

    }
}

<div id="id01"></div>

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var arrTags = JSON.parse(this.responseText);
       displayArr(arrTags);
    }
};
xhttp.open("GET", apiRoot + '/users/tag/' + Math.random() , true);
xhttp.send();

function displayArr(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<username: ' + arr[i].ind + ' >' +
        arr[i].tag + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out;
}


// class User extends Component{
//
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar items={['Home', 'Marketing', 'Business', 'Graphic Design', 'Programmer', 'Engineer', 'Investor']}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> The Start Cup </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
    );
  }
}


export default App;
