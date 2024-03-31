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
      localStorage.clear(); // Limpa o localStorage antes de salvar novos dados
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      navigate('/dashboard'); // Redireciona para a dashboard
    } catch (error) {
      console.error('Erro na autenticação:', error);
      //setError(error); // Define a mensagem de erro para exibição
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Box>
        <Card variant="outlined" sx={{ mt: 2, alignItems: 'center', }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
                sx={{
                  fontSize: '15px',
                  fontFamily: 'Arial',
                  width: '140px',
                  height: '50px',
                  borderWidth: '1px',
                  color: 'white', // Garante que o texto seja branco
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
                  // Para a variação dark
          
              }} 
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
