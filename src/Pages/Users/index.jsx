import React, { useState } from "react";
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import api from "../../services/api";
import DrawerTemplate from "../../components/DrawerTemplate";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "../../components/DataTable";

export default function Users(props) {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false);
 
  const handleSignUp = async (e) => {
    e.preventDefault();

    const users = { email, name, lastname, password, confirmpassword }

    if (!users) {
      toast.error("Por favor, preencha todos os campos para se cadastrar!");
    } else {
      try {
        await toast.promise(api.post("/signup", users), {
          pending: "Cadastrando novo usuário...",
          success: "Cadastrado com sucesso! Redirecionando para o login...",
          error:
            "Erro ao cadastrar. Verifique suas credenciais e tente de novo.",
        });
      } catch (err) {
        const error = err.response.data.error;

        toast.error(error);
      }
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    
    const users = { email, name, lastname, password, confirmpassword };

    if (!users) {
      toast.error("Por favor, preencha todos os campos para excluir o usuário!");
    } else {
      try {
        await toast.promise(api.delete(`/${users.id}`), {
          pending: "Excluindo usuário...",
          success: "Excluido com sucesso!",
          error:
            "Erro ao excluir. Verifique suas credenciais e tente de novo.",
        });
      } catch (err) {
        const error = err.response.data.error;

        toast.error(error);
      }
    }
  }

  return (
    
    <DrawerTemplate title="Usuário">

      <Container component="article" maxWidth="xl">

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, mt: 4, width: "50ch" },
          }}
        >

          <form
            onSubmit={handleSignUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >

            <TextField
              required
              id="email"
              label="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="name"
              label="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="lastName"
              label="Sobrenome"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              type="text"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="password"
              label="Senha"
              value={password}
              onChange={(e) => {
                  setPassword(e.target.value);
              }}
              type="password"
              variant="outlined"
              autoComplete="current-password"
              margin="normal"
            />

            <TextField
              required
              id="confirmPassword"
              label="Repita a Senha"
              value={confirmpassword}
              onChange={(e) => {
                  setConfirmPassword(e.target.value)
              }}
              type="password"
              variant="outlined"
              autoComplete="current-password"
              margin="normal"
            />

            <FormControlLabel
              sx={{ ml: 2, mt: 2 }}
              control={<Checkbox />}
              label="Admin"
              checked={admin}
              onChange={(e) => {
                  setAdmin(e.target.checked)
              }}
            />

            <Button
              style={{
                height: "40px",
                marginTop: "40px",
                marginLeft: "20px",
                width: "120px",
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Cadastrar
            </Button>

            <Button
              style={{
                height: "40px",
                marginTop: "40px",
                marginLeft: "20px",
                width: "120px",
              }}
              type="submit"
              variant="contained"
              color="error"
              onSubmit={handleRemove}
            >
              Excluir
            </Button>

          </form>

        </Box>

        <ToastContainer />

      </Container>

      <Container style={{ marginTop: "40px" }} component="table" maxWidth="md">

        <DataTable />

      </Container>

    </DrawerTemplate>
  );
}
