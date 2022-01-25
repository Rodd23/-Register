import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Container } from '@mui/material';
import api from '../../services/api';

import { Context } from '../../Context/AuthContext';

export default function Users() {
    const { handleLogout } = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/users');

            setUsers(data);
        })();
    }, [])

    return (
        <Container component="article" maxWidth="sm">
            <Typography variant="h1" align="center" component="div">Cadê o CEO desse sistema</Typography>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <Button type="submit" variant="contained" color="primary" onClick={handleLogout} >Sair</Button>
        </Container>
    )
}