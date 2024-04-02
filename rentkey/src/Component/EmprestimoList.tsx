import { useEffect, useState } from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Button, Typography, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';

interface Emprestimo {
    ID: number;
    Chave_ID: number;
    DataHoraEmprestimo: string;
    DataHoraDevolucao: string | null;
    Usuario_ID: number;
    Status: boolean;
}

export default function EmprestimosList() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const userID = localStorage.getItem('userId');

    useEffect(() => {
        const fetchEmprestimos = async () => {
            if (!userID) return;

            try {
                const response = await fetch(`http://localhost:3333/api/emprestimo/buscarEmprestimoPorUsuario/${userID}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Falha ao carregar empréstimos');

                const data = await response.json();
                setEmprestimos(data);
            } catch (error) {
                console.error('Erro ao carregar empréstimos:', error);
                enqueueSnackbar('Erro ao carregar empréstimos', { variant: 'error' });
            }
        };

        fetchEmprestimos();
    }, [userID, enqueueSnackbar]);

    const handleDevolucao = async (emprestimoID: number) => {
        try {
            const response = await fetch(`http://localhost:3333/api/emprestimo/atualizarOuDevolverEmprestimo/${emprestimoID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: true }), // Exemplo de corpo da requisição, ajuste conforme sua API
            });

            if (!response.ok) throw new Error('Falha na devolução da chave');

            enqueueSnackbar('Chave devolvida com sucesso!', { variant: 'success' });
            // Atualize a lista de empréstimos após a devolução
            setEmprestimos(emprestimos.filter(emprestimo => emprestimo.ID !== emprestimoID));
        } catch (error) {
            console.error('Erro na devolução da chave:', error);
            enqueueSnackbar('Erro na devolução da chave', { variant: 'error' });
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <Grid item xs={12} md={8} lg={6}> {/* Ajuste os breakpoints conforme a necessidade */}
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Empréstimos Ativos
                        </Typography>
                        <List>
                            {emprestimos
                                .filter((emprestimo) => emprestimo.Status === true)
                                .map((emprestimo) => (
                                    <ListItem key={emprestimo.ID} divider>
                                        <ListItemText
                                            primary={`Chave ID: ${emprestimo.Chave_ID}`}
                                            secondary={`Emprestado em: ${new Date(emprestimo.DataHoraEmprestimo).toLocaleDateString()}`}
                                        />
                                        <Button variant="outlined" color="primary" onClick={() => handleDevolucao(emprestimo.ID)}>
                                            Devolver
                                        </Button>
                                    </ListItem>
                                ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
