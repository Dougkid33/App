// routes/userRoutes.js
import { Router } from "express";
import { registerUser, loginUser, getUserInfo, updateUserInfo, deleteUserAccount, listAllUsers } from '../Controller/UserController.js';

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', registerUser);

// Rota para autenticar um usuário existente
router.post('/login', loginUser);

// Rota para buscar informações de um usuário autenticado
router.get('/buscarInfo/:id', getUserInfo);

// Rota para atualizar informações de um usuário autenticado
router.put('/editarUser/:id', updateUserInfo);

// Rota para deletar um usuário autenticado
router.delete('/deletaruser/:id', deleteUserAccount);

// Rota para listar todos os usuários
router.get('/listarUsuarios', listAllUsers);

export default router;
