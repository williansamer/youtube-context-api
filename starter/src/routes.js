import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { Context } from './Context/AuthContext';

import Login from './pages/Login';
import Users from './pages/Users';

export default function Routes() {

  function CustomRoute({isPrivate, ...rest}){ // isPrivate é um boolean que indica se a rota é privada ou não. O ...rest é para passar todas as propriedades que não são isPrivate

    const {loading, authenticated} = useContext(Context);

    if(loading){ //se o useEffect ainda não finalizou o carregamento, por padrão, o 'Context.Provider' também não renderizará, então temos que colocar o 'loading' para retorna um loading
      return <h1>Loading...</h1>
  }

    if(isPrivate && !authenticated){
      return <Redirect to="/login" />
    }
    return <Route {...rest} />

  }

  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/users" component={Users} />
    </Switch>
  );
}