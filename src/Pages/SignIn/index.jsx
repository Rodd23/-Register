import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import StoreContext from "../../components/Store/Context";

export const SignIn = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(StoreContext);

  /*function login ({ email, password }) {
      if(email === "admin@email" && password === 'admin') {
          return { token: '1234'};
      } else {
          return { error: "Usuário ou senha inválida"};
      }
  }*/

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

        const { token } = response.data;

        if(token) {
            setToken(token);
            return navigate("/dashboard");
        }

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
