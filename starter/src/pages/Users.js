import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../Context/AuthContext';

import api from '../api'; // importando a api(axios)

export default function Users() {
  const [users, setUsers] = useState([]);
  const {handleLogout} = useContext(Context);

  useEffect(() => { // o useEffect não permite que use o async/await dentro dele, então criamos uma função dentro dele com async/await
    (async () => {
      const { data } = await api.get('/users');//  desestruturando o data do retorno da api. É como fosse fazer as promises e retornando o data

      setUsers(data);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.website})</li>
        ))}
      </ul>

      <button onClick={handleLogout} type="button">Sair</button>
    </>
  );
}
