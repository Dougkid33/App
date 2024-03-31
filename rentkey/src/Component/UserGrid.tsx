/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    tipoUsuario: string;
}

function UserGrid() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3333/api/usuario/listarUsuarios', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Falha ao carregar os usuários');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erro ao carregar os usuários:', error);
                enqueueSnackbar('Erro ao carregar os usuários', { variant: 'error' });
            }
        };

        fetchUsers();
    }, [enqueueSnackbar]);

    const handleEdit = (id: number) => {
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            navigate('/editarUser', { state: { user: userToEdit } });
        }
    };

    const handleSelectUser = (id: number ) => {
        setSelectedUser(id);
    };

    const handleDelete = async (id: number) => {
        const userDelete = users.find(user => user.id === id);
        const confirmDelete = window.confirm("Tem certeza que deseja deletar este usuário?");
        if (confirmDelete && userDelete) {
            try {
                const response = await fetch(`http://localhost:3333/api/usuario/deletaruser/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao deletar o usuário');
                }

                setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
                enqueueSnackbar('Usuário deletado com sucesso.', { variant: 'success' });
            } catch (error) {
                console.error('Erro ao deletar o usuário:', error);
                enqueueSnackbar('Erro ao deletar o usuário', { variant: 'error' });
            }
        }
    };
    const rows = [];
    for(const user of users){
        rows.push(
            <TableRow key={user.id} onClick={() => handleSelectUser(user.id)} style={{ cursor: 'pointer', backgroundColor: selectedUser === user.id? 'lightblue' : 'white' }}>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.cargo}</TableCell>
                <TableCell>{user.tipoUsuario}</TableCell>
                <TableCell align="left">
                    <IconButton onClick={() => handleEdit(user.id)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
                </TableCell>
            </TableRow>
        );
    }
    return (
        <Box sx={{ marginTop: '100px', textAlign: 'center', marginRight: '300px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                            <TableCell colSpan={4}>
                                <h1>Lista de usuários</h1>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Cargo</TableCell>
                            <TableCell>Tipo de Usuário</TableCell>
                            <TableCell align="left">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserGrid;
