import Chave from '../models/Keys.js';


export const createKey = async (keyData) => {
    if (!keyData.SalaDaChave) {
        throw new Error('A Sala a qual a Chave pertence é obrigatória.');
    }

    const key = await Chave.create(keyData);
    return key;
};

export const getKey = async (id) => {
    const key = await Chave.findByPk(id);
    return key;
};

export const deleteKey = async (id) => {
    const numberOfDestroyedRows = await Chave.destroy({
        where: { id: id },
    });
    return numberOfDestroyedRows;
};


export const listAllKeys = async () => {
    try {
        const keys = await Chave.findAll();
        return keys;
    } catch (error) {
        console.error('Erro ao listar todas as chaves:', error);
        throw error; // Ou retorne uma resposta de erro apropriada, dependendo do seu contexto
    }
};

export const updateKey = async (id, keyData) => {
    const key = await Chave.findByPk(id);
    if (!key) throw new Error('Chave não encontrada');
    await key.update(keyData);
    return key;
}

