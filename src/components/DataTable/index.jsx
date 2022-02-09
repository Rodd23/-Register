import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import io from "socket.io-client";

const dataUsers = [];

const socket = io('http://localhost:3001');

socket.on("users/signup", (data) => {
  dataUsers.push(data)
})


export default function DataTable() {

  const { user } = useContext(AuthContext) 
  const [users, setUsers] = useState([])

  useEffect(() => {
    setInterval(() => {
      if(dataUsers.length > 0) {
        setUsers(dataUsers)
      }
    }, 5000);
  },[]);

  useEffect(() => {
    const data = api.get("users", {
      headers: { 
        authorization: api.defaults.headers.common.authorization = user.token
      }
    })
    console.log(data)
    setUsers(data)
  },[user])
  
  return (
    <TableContainer sx={{ width: 650}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Sobrenome</TableCell>
            <TableCell align="left">Nome Completo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell component="th" scope="row">
                {u.id}
              </TableCell>
              <TableCell align="left">{u.name}</TableCell>
              <TableCell align="left">{u.lastname}</TableCell>
              <TableCell align="left">{u.name + ' ' + u.lastname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
