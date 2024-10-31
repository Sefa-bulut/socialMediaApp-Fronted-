import { FormControl, Input, InputLabel, Button, FormHelperText } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {PostWithAuth, PostWithoutAuth } from '../../services/HttpService';

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("");
        setPassword("");
        navigate('/'); // Mevcut sayfayı yeniden yükle
    }


    const sendRequest = (path) => {
        PostWithAuth(("/auth/" + path), {
            userName : username,
            password : password,
        })
        .then((res) => res.json())
        .then((result) => {localStorage.setItem("tokenKey",result.message);
            localStorage.setItem("currentUser",result.userId);
            localStorage.setItem("userName",username)})
        .catch((err) => console.log(err))
    }


  return (
    <FormControl style={{marginTop:50}} >

        <InputLabel>Username</InputLabel>
        <Input onChange={(input) => handleUsername(input.target.value)} />

        <InputLabel style={{top:80}}>Password</InputLabel>
        <Input style={{top:40}}
        onChange={(input) => handlePassword(input.target.value)} />

        <Button type="submit" variant="contained" 
        color="primary" sx={{ marginTop: 10 }}
        onClick={() => handleButton("register")} >
            Register
        </Button>
        <FormHelperText sx={{ marginTop: 2 }}>Are you already registered?</FormHelperText>
        <Button type="submit" variant="contained" 
        color="primary" sx={{ marginTop: 2 }}
        onClick={() => handleButton("login")} >
            Login
        </Button>

    </FormControl>
  )
}
