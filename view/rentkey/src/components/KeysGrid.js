import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const KeysGrid = () => {
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        // Substitua com a sua lógica de busca de dados
        fetch('http://localhost:3333/api/chaves/listarTodasChaves')
            .then(response => response.json())
            .then(data => setKeys(data))
            .catch(error => console.error('Erro ao buscar chaves:', error));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Sala</TableCell>
                        <TableCell align="left">Situação de Empréstimo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((key) => (
                        <TableRow
                            key={key.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="left">{key.SalaDaChave}</TableCell>
                            <TableCell align="right">
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    alignSelf: 'center',
                                    marginLeft:'50px',
                                    displayflex: 'flex',    
                                    borderRadius: '50%',
                                    backgroundColor: key.SituacaoEmprestimo ? 'green' : 'red',
                                }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default KeysGrid;
