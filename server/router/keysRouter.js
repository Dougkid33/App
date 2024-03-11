import express from 'express';
import { createChave, getChave, deleteChave, listAllChaves, updateChave } from '../Controller/KeysController.js'; // Ajuste o caminho de importação conforme necessário

const keyRouter = express.Router();

keyRouter.post('/criarChaves', createChave);
keyRouter.get('/buscarChaves/:id', getChave);
keyRouter.delete('/deletarChaves/:id', deleteChave);
keyRouter.get('/listarTodasChaves', listAllChaves);
keyRouter.put('/atualizarChaves/:id', updateChave);


export default keyRouter;
