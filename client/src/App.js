import React from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = () => {
    window.open('http://localhost:5151/auth/twitter', '_self');
  };

  const fetchUser = async () => {
    const path = user ? 'logout' : 'login/success';
    try {
      const { data } = await axios.get(`http://localhost:5151/auth/${path}`, {
        withCredentials: true,
      });

      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <h1>
        {user
          ? `Welcome back ${user.username} - ${user.displayName}`
          : 'Please Login'}
      </h1>
      <button onClick={handleClick}>{user ? 'logout' : 'login'}</button>
    </div>
  );
}

export default App;
