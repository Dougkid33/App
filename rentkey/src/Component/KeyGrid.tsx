import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Key {
 id: number;
 SalaDaChave: string;
 Descricao: string;
 SituacaoEmprestimo: boolean;
}

function KeyGrid() {
 const [keys, setKeys] = useState<Key[]>([]);

 useEffect(() => {
    fetch('http://localhost:3333/api/chaves/listarTodasChaves')
      .then(response => response.json())
      .then(data => setKeys(data))
      .catch(error => console.error('Erro ao buscar chaves:', error));
 }, []);

 return (
  <Box sx={{ marginTop: '100px', textAlign: 'center', marginRight: '300px' }}>
    <TableContainer component={Paper} sx={{ maxWidth: '80%', overflowX: 'auto', padding: '16px' }}>
      <Table sx={{ minWidth: '80%' }} aria-label="tabela de chaves">
        <TableHead>
        <TableRow>
                            <TableCell colSpan={4}>
                                <h1>Tabela de Chaves</h1>
                            </TableCell>
                        </TableRow>
          <TableRow>
            <TableCell>Sala da Chave</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell align="left">Situação do Empréstimo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map((key) => (
            <TableRow
              key={key.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key.SalaDaChave}
              </TableCell>
              <TableCell>{key.Descricao}</TableCell>
              <TableCell align="left">
                {key.SituacaoEmprestimo ? (
                 <HighlightOffIcon color="error" />
                ) : (
                 <CheckCircleOutlineIcon color="success" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
 );
}

export default KeyGrid;
