/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, CardContent, TextField, MenuItem, FormControl, InputLabel, Button, Box, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


interface Usuario {
    id: number;
    nome: string;
    idade: number;
    sexo: 'Masculino' | 'Feminino' | 'Outro';
    email: string;
    user: string;
    password: string;
    cargo: string;
    tipoUsuario: 'Administrador' | 'Aluno' | 'Professor';
}

interface Chave {
    ID: number;
    SalaDaChave: string;
    SituacaoEmprestimo: boolean;
    Descricao: string;
}

interface Reserva {
    DataHoraEmprestimo: Date | null;
    DataHoraDevolucao: Date | null;
    Usuario_ID: number | null;
    Chave_ID: number | null;
}

function ReservaForm() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [chaves, setChaves] = useState<Chave[]>([]);
    const [reserva, setReserva] = useState<Reserva>({
        DataHoraEmprestimo: null,
        DataHoraDevolucao: null,
        Usuario_ID: null,
        Chave_ID: null,
    });
    //const [usuarioTipo, setUsuarioTipo] = useState<string>('Comum');
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); 

    useEffect(() => {
        // Função para buscar usuários
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3333/api/usuario/listarUsuarios');
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                const url = `http://localhost:3333/api/usuario/buscarInfo/${userId}`;
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Falha ao buscar informações do usuário');
                    }

                    const userData = await response.json();
                    setUsuarioLogado(userData);
                    setUsuarioNome(userData.nome);
                    //setUsuarioTipo(userData.tipoUsuario);

                    // Se o usuário não for administrador, defina o ID do usuário na reserva automaticamente.
                    if (userData.tipoUsuario !== 'Administrador') {
                        setReserva(reservaAtual => ({
                            ...reservaAtual,
                            Usuario_ID: userData.id
                        }));
                    }
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        // Função para buscar chaves
        const fetchChaves = async () => {
            try {
                const response = await fetch('http://localhost:3333/api/chaves/listarTodasChaves');
                if (!response.ok) {
                    throw new Error('Erro ao buscar chaves');
                }
                const data: Chave[] = await response.json();
                setChaves(data.map((chave: Chave) => ({
                    ...chave,
                    id: chave.ID, // Adaptando para a estrutura esperada pela interface Chave
                    sala: chave.SalaDaChave // Adaptando para a estrutura esperada pela interface Chave
                })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
        fetchUsuarios();
        fetchChaves();
    }, []);


    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        // Verifica se a alteração foi para os campos Usuario_ID ou Chave_ID
        if (name === 'Usuario_ID' || name === 'Chave_ID') {
            // Converte o valor para number, ou para null se for uma string vazia ('')
            const numericValue = value === '' ? null : Number(value);

            setReserva(prevState => ({
                ...prevState,
                [name]: numericValue,
            }));

            // Caso específico para quando o Usuario_ID é alterado
            if (name === 'Usuario_ID') {
                const usuarioSelecionado = usuarios.find(usuario => usuario.id === numericValue);
                setUsuarioNome(usuarioSelecionado ? usuarioSelecionado.nome : '');
                //setUsuarioTipo(usuarioSelecionado ? usuarioSelecionado.tipoUsuario : 'Comum');
            }
        } else {
            // Para todos os outros campos que não necessitam conversão
            setReserva(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3333/api/emprestimo/criarEmprestimo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva),
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar reserva');
            }

            const result = await response.json();
            console.log(result);
            //alert('Reserva enviada com sucesso!');
            enqueueSnackbar('Reserva efetuada com sucesso!', { variant: 'success' });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Falha ao efetuar Reserva!', { variant: 'error' });
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 25, alignItems:'center'}}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Reservar Chave</Typography>
            <Card>
                <CardContent sx={{ pt: 3, pb: 2 }}>
                 
                    <div>
                        <label>Data/Hora do Empréstimo</label>
                        <DatePicker
                            selected={reserva.DataHoraEmprestimo}
                            onChange={(date: Date) => setReserva({ ...reserva, DataHoraEmprestimo: date })}
                            showTimeSelect
                            dateFormat="Pp"
                            wrapperClassName="datePicker"
                        />
                    </div>
                    <div>
                        <label>Data/Hora da Devolução</label>
                        <DatePicker
                            selected={reserva.DataHoraDevolucao}
                            onChange={(date: Date) => setReserva({ ...reserva, DataHoraDevolucao: date })}
                            showTimeSelect
                            dateFormat="Pp"
                            wrapperClassName="datePicker"
                        />
                    </div>

                    {usuarioLogado && usuarioLogado.tipoUsuario === 'Administrador' ? (
                        <FormControl fullWidth>
                            <InputLabel>Usuário</InputLabel>
                            <Select
                                value={reserva.Usuario_ID !== null ? reserva.Usuario_ID.toString() : ''}
                                label="Usuário"
                                onChange={handleChange}
                                name="Usuario_ID"
                            >
                                {usuarios.map((usuario) => (
                                    <MenuItem key={usuario.id} value={usuario.id.toString()}>{usuario.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                    ) : (
                        <TextField
                            label="Nome do Usuário"
                            value={usuarioNome}
                            InputProps={{ readOnly: true }}
                            variant="filled"
                        />
                    )}
                    <FormControl fullWidth>
                        <InputLabel>Chave</InputLabel>
                        <Select
                            value={reserva.Chave_ID?.toString() || ''}
                            label="Chave"
                            onChange={handleChange}
                            name="Chave_ID"
                        >
                            <MenuItem value="" disabled>
                                Selecione uma chave
                            </MenuItem>
                            {chaves.map((chave) => (
                                <MenuItem key={chave.ID} value={chave.ID.toString()}>{chave.SalaDaChave}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained">Reservar</Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ReservaForm;
