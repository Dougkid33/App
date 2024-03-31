import { createKey, getKey, deleteKey, listAllKeys,updateKey } from '../DAO/KeysDAO.js'; // Ajuste o caminho de importação conforme necessário


export const createChave = async (req, res) => {
    try {
        const chave = await createKey(req.body);
        res.status(201).json(chave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChave = async (req, res) => {
    try {
        const chave = await getKey(req.params.id);
        if (!chave) {
            return res.status(404).json({ error: 'Chave não encontrada' });
        }
        res.status(200).json(chave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteChave = async (req, res) => {
    try {
        // Extrai o ID dos parâmetros da rota
        const { id } = req.params;
        const numberOfDestroyedRows = await deleteKey(id);

        if (numberOfDestroyedRows === 0) {
            return res.status(404).json({ error: 'Chave não encontrada' });
        }

        res.status(200).json({ message: 'Chave deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listAllChaves = async (req, res) => {
    try {
        const chaves = await listAllKeys();
        res.status(200).json(chaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateChave = async (req, res) => {
    try {
        const chave = await updateKey(req.body.ID, req.body);
        res.status(200).json(chave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
