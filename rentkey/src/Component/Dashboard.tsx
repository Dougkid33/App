import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import KeyGrid from './KeyGrid';
import UserInfoSidebar from './UserInfoSidebar';
import AdmKeyGrid from './AdmKeyGrid';
import UserGrid from './UserGrid'; // Importando o novo componente
import EmprestimosList from './EmprestimoList';
import './Dashboard.css';

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
      if (!token) return;

      try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
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
          {/* Titulo pode ser adicionado aqui se necessário */}
        </div>
        {/* Renderiza AdmKeyGrid e UserGrid se o usuário for administrador, caso contrário, renderiza KeyGrid */}
        {userInfo.tipoUsuario === "Administrador" && (
          <>
            <AdmKeyGrid />
            <UserGrid /> {/* Adicionando a UserGrid */}
          </>
        )}
        {userInfo.tipoUsuario !== "Administrador" && <KeyGrid />}
        <EmprestimosList /> {/* EmprestimosList é renderizado para todos os usuários */}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
