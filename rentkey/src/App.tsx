import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import LoginPage from './Component/LoginPage';
import AddKeyForm from './Component/AddKeyForm';
import ReservaForm from './Component/ReservaForm';
import AddUserForm from './Component/AddUserForm';
import Header from './Component/Header'; 
import AdmKeyGrid from './Component/AdmKeyGrid';
import EmprestimosList from './Component/EmprestimoList';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
     
      <SnackbarProvider maxSnack={3}>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adicionar-chave" element={<AddKeyForm />} />
          <Route path="/reservar" element={<ReservaForm />} />
          <Route path="/adicionar-usuario" element={<AddUserForm />} />
          <Route path="/adm-chaves" element={<AdmKeyGrid />} />
          <Route path="/emprestimos" element={<EmprestimosList />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
