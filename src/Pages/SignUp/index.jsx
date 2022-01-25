import React, { useState } from "react";
import history from '../../history';
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

export default function SingnUp() {

  const [user, setUser] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    rpassword: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, name, lastName, password, rpassword } = user;

    if (!email || !name || !lastName || !password || !rpassword) {
      toast.error("Por favor, preencha todos os campos para se cadastrar!");
    } else {
      try {
        const data = { ...user };
        await toast.promise(api.post("/signup", data), {
          pending: "Cadastrando novo usuário...",
          success: "Cadastrado com sucesso! Redirecionando para o login...",
          error:
            "Erro ao cadastrar. Verifique suas credenciais e tente de novo.",
        });
        setTimeout(() => history.push('/'), 5000);
      } catch (err) {
        const error = err.response.data.error;

        toast.error(error);
      }
    }
  };

  return (
    <Container component="article" maxWidth="sm">
      <Typography mt={10} variant="h3" component="h1">
        Cadastro
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          required
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.email}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }));
          }}
        />

        <TextField
          required
          id="name"
          label="Nome"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.name}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, name: e.target.value }));
          }}
        />

        <TextField
          required
          id="lastName"
          label="Sobrenome"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.lastName}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, lastName: e.target.value }));
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
          value={user.password}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

        <TextField
          required
          id="rpassword"
          label="Repita a Senha"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          value={user.rpassword}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, rpassword: e.target.value }));
          }}
        />

        <Grid mt={1} container spacing={1}>
          <Grid item xs={6} md={4}>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Grid>
          <Grid item xs={6} md={8}>
            <Link href="/" underline="none">
              Já possui Cadastro? Então faça o login
            </Link>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
};
