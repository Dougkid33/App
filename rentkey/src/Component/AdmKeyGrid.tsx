/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface Key {
    ID: number;
    SalaDaChave: string;
    Descricao: string;
    SituacaoEmprestimo: boolean;
}



function AdmKeyGrid() {
    const [keys, setKeys] = useState<Key[]>([]);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [selectedKey, setSelectedKey] = useState<number | null>(null);

    useEffect(() => {
        const fetchKeys = async () => {
            try {
                const response = await fetch('http://localhost:3333/api/chaves/listarTodasChaves', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Falha ao carregar as chaves');
                }
                const data = await response.json();
                setKeys(data);
            } catch (error) {
                console.error('Erro ao carregar as chaves:', error);
                enqueueSnackbar('Erro ao carregar as chaves', { variant: 'error' });
            }
        };

        fetchKeys();
    }, [enqueueSnackbar]);

    const handleEdit = (id: number,) => {
 
        console.log('ID a ser Editado:', id);
        const keyToEdit = keys.find(key => key.ID === id);
        if (keyToEdit) {
            navigate('/adicionar-chave', { state: { key: keyToEdit } });
        }
    };

    const handleSelectKey = (id: number ) => {
        setSelectedKey(id);
    };

    const handleDelete = async (id: number) => {

        console.log('ID a ser deletado:', id);
        console.log(keys);

        const keyToDelete = keys.find(key => key.ID === id);
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta chave?");

        if (confirmDelete && keyToDelete) {
            try {
                const response = await fetch(`http://localhost:3333/api/chaves/deletarChaves/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao deletar a chave');
                }

                setKeys(currentKeys => currentKeys.filter(key => key.ID !== id));
                enqueueSnackbar('Chave deletada com sucesso.', { variant: 'success' });
            } catch (error) {
                console.error('Erro ao deletar a chave:', error);
                enqueueSnackbar('Erro ao deletar a chave', { variant: 'error' });
            }
        }
    };
    const rows = [];
    for (const key of keys) {
        rows.push(
          <TableRow key={key.ID} onClick={() => handleSelectKey(key.ID)} style={{ cursor: 'pointer', backgroundColor: selectedKey === key.ID? 'lightblue' : 'white' }}>
            <TableCell>{key.SalaDaChave}</TableCell>
            <TableCell>{key.Descricao}</TableCell>
            <TableCell align="left">
              {key.SituacaoEmprestimo ? <HighlightOffIcon color="error" /> : <CheckCircleOutlineIcon color="success" />}
            </TableCell>
            <TableCell align="left">
              <IconButton onClick={() => handleEdit(key.ID)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(key.ID)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        );
      }

    return (
        <Box sx={{ marginTop: '100px', textAlign: 'center', marginRight: '300px' }}> {/* Adicionando espaço acima da tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <h1>Tabela de Chaves</h1>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sala da Chave</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell align="left">Situação do Empréstimos</TableCell>
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
export default AdmKeyGrid;
