import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="static" className="header">
            <div className="top">

            </div>
            <Toolbar className="toolbar">
                <div>
                    <Button sx={{
                        ...buttonStyle,
                        marginRight: '5px',
                    }} onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Button>
                    <Button
                        sx={{ ...buttonStyle }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </div>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
