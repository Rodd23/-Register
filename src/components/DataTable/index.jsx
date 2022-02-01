import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../../services/api";

function createData(id, name, lastName) {
  return { id, name, lastName};
}

export default function AcccessibleTable() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
          const { data } = await api.get("/users");
    
          setUsers(data);
        })();
      }, []);

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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.name + ' ' + user.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
