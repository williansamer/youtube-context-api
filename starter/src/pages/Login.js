import React, {useContext} from 'react';
import {Context} from '../Context/AuthContext';

export default function Login() {

  const {authenticated, handleLogin} = useContext(Context);

    console.log("Login", authenticated)

  return <button onClick={handleLogin} type="button">Entrar</button>;
}