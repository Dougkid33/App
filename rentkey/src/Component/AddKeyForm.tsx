import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

interface Key {
  id?: number;
  SalaDaChave: string;
  Descricao: string;
  SituacaoEmprestimo: boolean;
}
interface LocationState {
  key: Key;
}

function AddKeyForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [formData, setFormData] = useState<Key>({
    SalaDaChave: '',
    Descricao: '',
    SituacaoEmprestimo: true,
  });

  useEffect(() => {
    const state = location.state as LocationState | null; // Uso de 'as' para tipagem, assumindo que pode ser nulo
    if (state && state.key) {
      setFormData(state.key);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = formData ? `http://localhost:3333/api/chaves/atualizarChaves/${formData.id}` : 'http://localhost:3333/api/chaves/criarChaves';
    const method = formData ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          // Inclua cabeçalhos adicionais aqui, como o token de autenticação se necessário
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Falha na operação com a chave');
      
      enqueueSnackbar(formData ? 'Chave atualizada com sucesso!' : 'Chave adicionada com sucesso!', { variant: 'success' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro na operação com a chave:', error);
      enqueueSnackbar('Erro na operação com a chave', { variant: 'error' });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 500, width: '100%', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" mb={2}>{formData ? "Editar Chave" : "Adicionar Chave"}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Sala da Chave"
              name="SalaDaChave"
              value={formData.SalaDaChave}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Descrição"
              name="Descricao"
              value={formData.Descricao}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              {formData ? "Atualizar" : "Adicionar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddKeyForm;


