import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  TextField,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { Context } from "../../Context/AuthContext";

export default function SignIn() {
  const { handleLogin } = useContext(Context);

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
        const response = toast.promise(api.post("/login", data), {
          pending: "Entrando...🏃‍♂️",
          success: "Logado com sucesso",
          error:
            "Erro ao realizar login. Tente novamente.",
        });
        //console.log((await response).data)
        handleLogin((await response).data.token)
        
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

        <Grid mt={1} container spacing={1}>
          <Grid item xs={6} md={4}>
            <Button type="submit" variant="contained" color="primary">
              Entrar
            </Button>
          </Grid>
          <Grid item xs={6} md={8}>
            <Link href="/signup" underline="none">
                Não possui Cadastro? Então faça o cadastro
            </Link>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};
