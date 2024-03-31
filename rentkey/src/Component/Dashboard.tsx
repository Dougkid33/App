
import { Grid,  } from '@mui/material';
import KeyGrid from './KeyGrid';
import UserInfoSidebar from './UserInfoSidebar';
import AdmKeyGrid from './AdmKeyGrid';
import './Dashboard.css';
import { useEffect, useState } from 'react';

interface UserInfo {
  nome?: string;
  idade?: number;
  sexo?: string;
  email?: string;
  user?: string;
  cargo?: string;
  tipoUsuario?: string;
}

function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <UserInfoSidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <div className="title">
         
        </div>
        {/* Renderiza AdmKeyGrid se o usuário for administrador, caso contrário, renderiza KeyGrid */}
        {userInfo.tipoUsuario === "Administrador" ? <AdmKeyGrid /> : <KeyGrid />}
      </Grid>
    </Grid>
  );
}


export default Dashboard;
