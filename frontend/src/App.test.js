import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  // Render the menu component on the page, and pass an array with menu options

  ReactDOM.render(
      <MenuBar items={ ['Home', 'Marketing', 'Business', 'Graphic Design', 'Programmer', 'Engineer', 'Investor'] } />,
      document.getElementById('container')
  );

});
