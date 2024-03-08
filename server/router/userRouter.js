// routes/userRoutes.js
import { Router } from "express";
import { registerUser, loginUser, getUserInfo, updateUserInfo, deleteUserAccount } from '../Controller/UserController.js';

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', registerUser);

// Rota para autenticar um usuário existente
router.post('/login', loginUser);

// Rota para buscar informações de um usuário autenticado
router.get('/me', getUserInfo);

// Rota para atualizar informações de um usuário autenticado
router.put('/me', updateUserInfo);

// Rota para deletar um usuário autenticado
router.delete('/me', deleteUserAccount);

export default router;
