import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './UserInfoSidebar.css';

interface UserInfo {
  nome?: string;
  idade?: number;
  sexo?: string;
  email?: string;
  user?: string;
  cargo?: string;
  tipoUsuario?: string;
}

function UserInfoSidebar() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarStyle = {
    width: isExpanded ? '300px' : '50px', // Torna o sidebar mais estreito quando não expandido
    transition: 'width 0.3s', // Transição suave da largura
    overflow: 'hidden', // Esconde o conteúdo não expandido
    cursor: 'pointer', // Indica que o elemento é interativo
    position: 'fixed', // Mantém o sidebar fixo à esquerda
    left: 0,
    top: 0,
    height: '100%', // Ocupa a altura total da tela
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centraliza os ícones/itens no sidebar
    backgroundColor: '#FFF', // Ajuste conforme necessário
    zIndex: 1000, // Garante que o sidebar fique acima de outros conteúdos
  };
  const arrowStyle = {
    transform: isExpanded ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.3s',
    alignSelf: 'flex-start', // Posiciona a seta no início do sidebar
    marginTop: '10px', // Um pequeno espaço do topo
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const url = `http://localhost:3333/api/usuario/buscarInfo/${userId}`;
      // Supondo que o token esteja armazenado no localStorage
      if (!token) return;

      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Falha ao buscar informações do usuário');

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Box
      sx={sidebarStyle}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ArrowForwardIosIcon sx={arrowStyle} />
      {isExpanded && (
      <Card className="card" sx={{ minWidth: '100%', margin: '10px' }}>
        <Card className="card2" sx={{ minWidth: '100%', margin: '10px' }}>
          <CardContent sx={{ '& > *': { marginBottom: 2 } }}>
            <Typography variant="h6"> Usuário</Typography>
            <Typography>NOME: {userInfo.nome}</Typography>
            <Typography>IDADE: {userInfo.idade}</Typography>
            <Typography>SEXO: {userInfo.sexo}</Typography>
            <Typography>E-MAIL: {userInfo.email}</Typography>
            <Typography>Username: {userInfo.user}</Typography>
            <Typography>Cargo: {userInfo.cargo}</Typography>
            <Typography>Tipo de Usuário: {userInfo.tipoUsuario}</Typography>
          </CardContent>
        </Card>
      </Card>
      )}
    </Box>
  );
}

export default UserInfoSidebar;
