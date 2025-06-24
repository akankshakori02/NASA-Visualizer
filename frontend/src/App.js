import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/apod')
      .then(res => setApod(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>NASA Explorer</h1>
      {apod ? (
        <div>
          <h2>{apod.title}</h2>
          <img src={apod.url} alt={apod.title} width="500" />
          <p>{apod.explanation}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default App;
