import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, Typography, Box, Card, CardContent, Alert } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores
    const endpoint = 'http://localhost:3333/api/usuario/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na autenticação');
      }

      const { token, user } = await response.json();
      //const {user} = await response.json();

      localStorage.clear(); // Limpa o localStorage antes de salvar novos dados
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
        console.log(user);
      
      navigate('/dashboard'); // Redireciona para a dashboard
    } catch (error) {
        console.error('Erro na autenticação:', error);
        //setError(error.message); // Define a mensagem de erro para exibição
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} {/* Exibe erros para o usuário */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
