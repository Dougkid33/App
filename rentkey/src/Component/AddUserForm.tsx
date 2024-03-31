import React, { useEffect, useState } from 'react';
import { Card, CardContent, TextField, MenuItem, FormControl, InputLabel, Button, Box, Select, SelectChangeEvent, Typography, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';

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
interface LocationState {
    user: Usuario;
  }
const AddUserForm: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        idade: 0,
        sexo: 'Masculino',
        email: '',
        user: '',
        password: '',
        cargo: '',
        tipoUsuario: 'Administrador',
    });
    const location = useLocation();
    useEffect(() => {
        const state = location.state as LocationState | null; // Uso de 'as' para tipagem, assumindo que pode ser nulo
        if (state && state.user) {
            setUsuario(state.user);
        }
      }, [location.state]);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const buttonStyle = {
        fontSize: '15px',
        fontFamily: 'Arial',
        width: '140px',
        height: '50px',
        borderWidth: '1px',
        color: 'white',
        alignItems: 'center',
        borderColor: '#333',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0px 10px 14px -7px rgba(0, 0, 0, 0.75)',
        textShadow: '0px 1px 0px #000',
        background: 'linear-gradient(#333, #111)',
        '&:hover': {
            background: 'linear-gradient(#111, #333)',
        },
        marginY: '10px', // Adiciona margem acima e abaixo para espaçamento entre os botões
      };



    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUsuario(prevState => ({ ...prevState, [name]: isNaN(+value) ? value : +value }));
    };

    // Manipulador para Select
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const endpoint = usuario ?` http://localhost:3333/api/usuario/editarUser/${usuario.id}` : `http://localhost:3333/api/usuario/register`;
        const method = usuario ? 'PUT' : 'POST';
        const sexo = usuario.sexo === 'Masculino' ? 'M' : usuario.sexo === 'Feminino' ? 'F' : 'Outro';

        // Preparando os dados do usuário para envio
        const userData = {
            nome: usuario.nome,
            idade: usuario.idade,
            sexo: sexo,
            email: usuario.email,
            user: usuario.user,
            password: usuario.password,
            cargo: usuario.cargo,
            tipoUsuario: usuario.tipoUsuario,
        };

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar usuário');
            }

            //const data = await response.json();
            enqueueSnackbar(userData ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!', { variant: 'success' });


            navigate('/dashboard');

        } catch (error) {
            enqueueSnackbar('Erro na operação com o  usuário', { variant: 'error' });
        }
    };

    return (

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Card sx={{ mt: 8, padding: 3 }}>
            <Typography variant="h5" mb={2}>{usuario ? "Editar Chave" : "Adicionar Chave"}</Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nome"
                                value={usuario.nome}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="Idade"
                                name="idade"
                                type="number"
                                value={usuario.idade}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <FormControl fullWidth>
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    name="sexo"
                                    value={usuario.sexo}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Feminino">Feminino</MenuItem>
                                    <MenuItem value="Outro">Outro</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={usuario.email}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="User"
                                name="user"
                                value={usuario.user}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={usuario.password}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                fullWidth
                                label="Cargo"
                                name="cargo"
                                value={usuario.cargo}
                                onChange={handleTextFieldChange}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Usuário</InputLabel>
                                <Select
                                    name="tipoUsuario"
                                    value={usuario.tipoUsuario}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                    <MenuItem value="Aluno">Aluno</MenuItem>
                                    <MenuItem value="Professor">Professor</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button type="submit" variant="contained" color="primary"sx={{...buttonStyle}}>
                            Adicionar Usuário
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
            );
};

            export default AddUserForm;
