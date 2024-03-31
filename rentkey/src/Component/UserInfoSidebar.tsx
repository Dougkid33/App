import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button ,} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const sidebarStyle = {
    width: isExpanded ? '300px' : '50px',
    transition: 'width 0.3s',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'fixed',
    right: 0, // Altera de 'left: 0;' para 'right: 0;'
    top: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(0deg, rgba(195,34,193,1) 0%, rgba(45,61,253,1) 100%)',
    zIndex: 1000
   };
   
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
        <Card className="card" sx={{ minWidth: '20%', margin: '20px' }}>
          <CardContent sx={{ '& > *': { marginBottom: 2 } }} className="card">
            <div className="img"></div>
            <Typography> <strong>Nome:</strong> {userInfo.nome}</Typography>
            <Typography><strong>Idade:</strong> {userInfo.idade}</Typography>
            <Typography><strong>Sexo</strong>: {userInfo.sexo}</Typography>
            <Typography><strong>E-MAIL:</strong> {userInfo.email}</Typography>
            <Typography><strong>Username</strong>: {userInfo.user}</Typography>
            <Typography><strong>Cargo</strong>: {userInfo.cargo}</Typography>
            <Typography><strong>Tipo de Usuário:</strong>{userInfo.tipoUsuario}</Typography>
          </CardContent>
        </Card>
      )}
      {isExpanded && userInfo.tipoUsuario === "Administrador" && (
        <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Button 
          variant="contained"
          // Adicione esta linha
          sx={{...buttonStyle}}
          onClick={() => navigate('/adicionar-usuario')}
        >
          Adicionar Usuário
        </Button>
          <Button
            variant="contained"
            
            onClick={() => navigate('/adicionar-chave')}
            sx={{...buttonStyle}}
          >
            Adicionar Chave
          </Button>

          
      </Box>
      )}
      <Button
            variant="contained"
            
            onClick={() => navigate('/reservar')}
            sx={{...buttonStyle}}
          >
            Reservar
          </Button>
    </Box>
  );
}

export default UserInfoSidebar;
