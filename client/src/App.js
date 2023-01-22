import React from 'react';
import axios from 'axios';

function App() {
  React.useEffect(() => {
    console.log('I got mounted');
  }, []);

  const handleClick = () => {
    window.open('http://localhost:5151/auth/twitter', '_self');
  };

  const handleClick2 = async () => {
    const data = await axios.get('http://localhost:5151');

    console.log(data);
  };

  return (
    <div className='App'>
      <h1>Hello world</h1>
      <button onClick={handleClick}>click</button>
      <button onClick={handleClick2}>click json</button>
    </div>
  );
}

export default App;
