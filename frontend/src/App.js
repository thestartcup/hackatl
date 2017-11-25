import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var apiRoot = 'http://localhost:8080'

var tagList = [
{"tag": "marketing", "val": "1"},
{"tag":"business", "val": "2"},
{"tag":"graphic-design", "val": "3"},
{"tag":"programming", "val": "4"},
{"tag":"engineering", "val": "5"},
{"tag":"investment", "val": "6"}

]

var tags = [
  'marketing',
  'business',
  'graphic-design',
  'programming',
  'engineering',
  'investment'
]

class MenuBar extends Component {

    getInitialState () {
        return { focused: 0 };
    }

    clicked (index) {

        // The click handler will update the state with
        // the index of the focused menu entry

        MakeList(apiRoot, index);
        this.setState({focused: index});
        //console.log(index);

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

class User extends Component {
  render () {
    return (
      <div>{this.props.id}</div>
    )
  }
}

// class UserList extends Component {
//   render () {
//
//   }
// }

function MakeList(index) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var arrTags = JSON.parse(this.responseText);
         displayArr(arrTags, index);
      }
  };
  xhttp.open("GET", apiRoot + '/users/tag/', true);
  xhttp.send();

  function displayArr(arr, index) {
      var out = "";
      var i;
      for(i = 0; i < arr.length; i++) {
        if (arr[i].tags.id.val == index.val){
          out += '<username: ' + arr[i].id + ' >' +
          arr[i].tag + '</a><br>';
        }
      }
      var displayTag = "";
      switch(index){
        case 0:
          displayTag = 'marketing';
          break;
        case 1:
          displayTag = 'business';
          break;
        case 2:
          displayTag = 'graphic-design';
          break;
        case 3:
          displayTag = 'programming';
          break;
        case 4:
          displayTag = 'engineering';
          break;
        case 5:
          displayTag = 'investment';
          break;
      }
      document.getElementById(displayTag).innerHTML = out;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar items={[ 'Marketing', 'Management', 'Graphic Design',
          'Programming', 'Engineering', 'Investment']}/>
      </div>
    );
  }
}


export default App;
