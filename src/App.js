import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Button } from 'antd';
import './App.css';
import UserDetails from './components/UserDetails';

function App() {

  const { REACT_APP_GITHUB_BASE_URL } = process.env;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);

  const userNameInputRef = useRef();

  const searchHandler = async () => {
    const userName = userNameInputRef.current.value;

    const user = await getUser(userName);
    const repo = await getRepo(userName);

    setUser(user);
    setRepo(repo);
  };

  const getUser = async (userName) => {
    let user_details = await fetch(`${REACT_APP_GITHUB_BASE_URL}/users/${userName}`);
    user_details = await user_details.json();
    return user_details;
  };

  const getRepo = async (userName) => {
    let repo_details = await fetch(`${REACT_APP_GITHUB_BASE_URL}/users/${userName}/repos`);
    repo_details = await repo_details.json();
    return repo_details;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {

  }, [user, repo]);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='container'>
        <div className='search-container'>
          <h1 className='text-center mt-4'>Search for Github User</h1>
          <div className='toggle-container'>
            <div className='toggle'>
              <input
                checked={isDarkMode}
                onChange={toggleDarkMode}
                id='switch'
                className='switch'
                type='checkbox'
              />
              <label htmlFor='switch'></label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Username" ref={userNameInputRef} width='75%' />
        </div>
        <Button block type="primary" shape="round" className='btn' onClick={searchHandler}>Search User</Button>
        <div className='mt-4 mb-4'>
          <UserDetails user_details={user} repo_details={repo} />
        </div>
      </div>
    </div>
  );
}

export default App;
