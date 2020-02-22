import React, { useState } from 'react';

import Joke from './Joke'

function App() {

  const [ userQuery, setUserQuery ] = useState("");

  const updateUserQuery = event => {
    setUserQuery(event.target.value);
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter'){
      searchQuery()
    }
  }

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  }

  return (
    <div className="App">
      <h1>Hello!</h1>
      <div className="form">
        <input type="text" value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress}/>
        <button type="submit" onClick={searchQuery}>Search</button>
      </div>
      <hr/>
      <Joke />
    </div>
  );
}

export default App;
