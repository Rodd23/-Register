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

  const [users, setUsers] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    admin: false,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, name, lastName, password, confirmPassword } = users;

    if (!email || !name || !lastName || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos para se cadastrar!");
    } else {
      try {
        const data = { ...users };
        await toast.promise(api.post("/signup", data), {
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

    
    const { email, name, lastName, password, confirmPassword } = users;

    if (!email || !name || !lastName || !password || !confirmPassword) {
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
              value={users.email}
              onChange={(e) => {
                setUsers((prev) => ({ ...prev, email: e.target.value }));
              }}
              type="email"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="name"
              label="Nome"
              value={users.name}
              onChange={(e) => {
                setUsers((prev) => ({ ...prev, name: e.target.value }));
              }}
              type="text"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="lastName"
              label="Sobrenome"
              value={users.lastName}
              onChange={(e) => {
                setUsers((prev) => ({ ...prev, lastName: e.target.value }));
              }}
              type="text"
              variant="outlined"
              margin="normal"
            />

            <TextField
              required
              id="password"
              label="Senha"
              onChange={(e) => {
                  setUsers((prev) => ({ ...prev, password: e.target.value }));
              }}
              value={users.password}
              type="password"
              variant="outlined"
              autoComplete="current-password"
              margin="normal"
            />

            <TextField
              required
              id="confirmPassword"
              label="Repita a Senha"
              value={users.confirmPassawod}
              onChange={(e) => {
                  setUsers((prev) => ({ ...prev, confirmPassword: e.target.value }))
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
              checked={users.admin}
              onChange={(e) => {
                  setUsers((prev) => ({ ...prev, admin:  e.target.checked }))
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
