import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { login } from "../../services/auth";
//import history from "../../history";

export default function SignIn(props) {
  
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = userLogin;

    if (!email || !password) {
      toast.error("Preencha o E-MAIL e SENHA");
    } else {
        const data = { ...userLogin };
        const response = await toast.promise(api.post("/login", data), {
          pending: "Entrando...🏃‍♂️",
          success: "Logado com sucesso",
          error:
            "Erro ao realizar login. Tente novamente.",
        });
        //console.log((await response).data)
        login(response.data)

        props.history.push("/dashboard");
        props.history.go();

        
        setUserLogin({email: '', password: ''})
    }
  };

  return (
    <Container component="article" maxWidth="sm">
      <Typography mt={10} variant="h3" component="h1">
        Login
      </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          required
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={userLogin.email}
          onChange={(e) => {
            setUserLogin((prev) => ({ ...prev, email: e.target.value }));
          }}
        />

        <TextField
          required
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          value={userLogin.password}
          onChange={(e) => {
            setUserLogin((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
         
      </form>
      <ToastContainer />
    </Container>
  );
};
