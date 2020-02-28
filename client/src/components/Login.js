import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //set up state for log in creds
  const [state, setState] = useState({
    credentials: {
        username: '',
        password: ''
    }
  })

  const login = event => {
    event.preventDefault();

    //make a POST request to send creds to API, and then retrieve a token. 
    axiosWithAuth()
    .post('/api/login', state.credentials)
    .then(response => {
        console.log(response)
        window.localStorage.setItem('token', response.data.payload)
        props.history.push('./Bubble-Page');
    })
    .catch(error => {
        console.log("Error making POST request to API", error);
    })

  }

  //handle changes to form input, updating state accordingly with login creds
  const handleChanges = event => {
    setState({
      credentials: {
        ...state.credentials,
        [event.target.name]: event.target.value
      }
    })
  }


  return (

    <div className="Login">
      <h1>Login</h1>

      <form onSubmit={login}>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={state.credentials.username}
          onChange={handleChanges}
        />

        <label htmlFor="password">Password:</label>
          <input
          type="password"
          name="password"
          value={state.credentials.password}
          onChange={handleChanges}
        />

        <button>Log in</button>
        
      </form>
    </div>
  );
};

export default Login;
