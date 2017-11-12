import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

//var React = require('react');
//You need this npm package to do createReactClass
//var createReactClass = require('create-react-class');

export default App;



// Render the menu component on the page, and pass an array with menu options

// ReactDOM.render(
//     <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
//     document.getElementById('container')
// );
