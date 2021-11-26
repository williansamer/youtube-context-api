import {useState, useEffect} from 'react';
import history from "../../history";

import api from "../../api"

export default function useAuth(){ // o useAuth é um hook que retorna um objeto com as propriedades authenticated e loading e as funções handleLogin e handleLogout

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        const token = localStorage.getItem("token");

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
        setLoading(false); //Ao finalizar, o loading é desativado e não retorna mais o loading

    }, []);

    async function handleLogin(){
        const {data: {token}} = await api.post("/authenticate"); //aqui estamos fazendo uma requisição para o backend, retorna um status 200 com o token

        localStorage.setItem("token", JSON.stringify(token)); //aqui estamos salvando o token no localStorage do navegador
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        history.push("/users");
    }

    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem("token"); //aqui estamos removendo o token do localStorage do navegador
        api.defaults.headers.Authorization = undefined;
        history.push("/login");
    }

    return {authenticated, loading, handleLogin, handleLogout};
}