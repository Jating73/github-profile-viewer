import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Button } from 'antd';
import './App.css';
import UserDetails from './components/UserDetails';

function App() {

  const { REACT_APP_GITHUB_BASE_URL } = process.env;
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);

  const userNameInputRef = useRef();

  async function searchHandler() {
    const enteredUserName = userNameInputRef.current.value;

    let user_details = await fetch(`${REACT_APP_GITHUB_BASE_URL}/users/${enteredUserName}`);
    user_details = await user_details.json();

    setUser(user_details);

    let repo_details = await fetch(`${REACT_APP_GITHUB_BASE_URL}/users/${enteredUserName}/repos`);
    repo_details = await repo_details.json();

    setRepo(repo_details);

  }

  useEffect(() => {

  }, [user, repo]);

  return (
    <div className="App">
      <div className='container'>
        <h1 className='text-center mt-4'>Search for Github User</h1>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Username" ref={userNameInputRef} width='75%'/>
        </div>
        <Button block type="primary" shape="round" className='btn'  onClick={searchHandler}>Search User</Button>
        <div className='mt-4'>
          <UserDetails user_details={user} repo_details={repo} />
        </div>
      </div>
    </div>
  );
}

export default App;
