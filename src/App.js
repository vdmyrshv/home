import React, { useState } from 'react';

//components

import Joke from './Joke'
import Stories from './Stories'
import Tasks from './Tasks'
import Gallery from './Gallery'

function App() {

  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setShowGallery] = useState(true);

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

  const toggleShowGallery = () => {
    setShowGallery(prevGallery => !prevGallery)
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
      <hr/>
      <Tasks />
      <hr/>
      <div>
        {showGallery && <Gallery />}
        <button onClick={toggleShowGallery}>{showGallery ? "Hide" : "Show"} Gallery</button>
      </div>
      <hr/>
      <Stories />
    </div>
  );
}

export default App;
