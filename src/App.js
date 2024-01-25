import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import PocketBase from 'pocketbase';
import GamePage from './components/gamepage';

const pb = new PocketBase('http://127.0.0.1:8090');





function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState(false);

  const [newEmail, setNewEmaill] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerif, setNewPasswordVerif] = useState('');
  const [newUser, setNewUser] = useState('');

  const [currentUserToken, setCurrentUserToken] = useState('');

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);


  async function loginAccount() {

    const authData  = await pb.collection('users').authWithPassword(email, password)
    .catch((error) => 
      {
        if(error.status === 400) {
          setLogin(false);
        } else {
          setLogin(true);
        }
      })

    setOpen(pb.authStore.isValid);


    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    setCurrentUserToken(pb.authStore.model.id)
    
    // "logout" the last authenticated account
  }

  async function createUser() {

    const record = await pb.collection('users').create({
      "username": newUser,
      "email": newEmail,
      "emailVisibility": true,
      "password": newPassword,
      "passwordConfirm": newPasswordVerif,
      "name": "test"
    });

    setOpen(true);
  }

  function endInstance() {
    setOpen(false)
    pb.authStore.clear();
  }

  async function storeScore(w, l) {
    const data = {
        "wins": w,
        "losses": l
      };
    
    
      const record = await pb.collection('users').update(currentUserToken, data);
  }

  return (
    <div className="App">
      {!open ? 
        <>
          

          <div>
            <h1>Login</h1>
            <input type="text" onChange={event => setEmail(event.target.value)} placeholder="email"></input>
            <input type="text" onChange={event => setPassword(event.target.value)} placeholder="password"></input>
            <button onClick={()=>{loginAccount()}}>login</button>
            {!login && <p>invalid login</p>}
          </div>
          <div>
            <h1>SignUp</h1>
            <input type="text" onChange={event => setNewEmaill(event.target.value)} placeholder="email"></input>
            <input type="text" onChange={event => setNewUser(event.target.value)} placeholder="username"></input>
            <input type="text" onChange={event => setNewPassword(event.target.value)} placeholder="password"></input>
            <input type="text" onChange={event => setNewPasswordVerif(event.target.value)} placeholder="password again"></input>
            <button onClick={()=>{createUser()}}>signup</button>
          </div>
        </>
        :
        <>
          <GamePage pScore={0} oScore={0} updateNumbers={storeScore}/>
          <button onClick={()=>{endInstance()}}>Log Out</button>
        </>
      }
    </div>
  );
}

export default App;
