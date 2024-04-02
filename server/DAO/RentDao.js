import Emprestimo from "../models/Rent.js";

export const createRent = async (rentData) => {
    if (!rentData.Chave_ID && !rentData.Usuario_ID) {
        throw new Error('O ID da Chave e do Usuário para o empréstimo é obrigatório.');
    }

    // Definindo status como true por padrão para todos os novos empréstimos
    const rentWithDefaultStatus = {
        ...rentData,
        Status: true, // Garante que o status seja sempre true ao criar um novo empréstimo
    };

    const rent = await Emprestimo.create(rentWithDefaultStatus);
    return rent;
};


export const getRent = async (id) => {
    const rent = await Emprestimo.findByPk(id);
    return rent;
};

export const deleteRent = async (id) => {
    const numberOfDestroyedRows = await Emprestimo.destroy({
        where: { ID: id },
    });
    return numberOfDestroyedRows;
};

export const listAllRents = async () => {
    try {
        const rents = await Emprestimo.findAll();
        return rents;
    } catch (error) {
        console.error('Erro ao listar todos os empréstimos:', error);
        throw error;
    }
}   

export const updateRent = async (id, rentData) => {
    const rent = await Emprestimo.findByPk(id);
    if (!rent) throw new Error('Empréstimo não encontrado');
    
    // Forçar a atualização do Status para false
    const updatedRentData = {
        ...rentData,
        Status: false
    };

    await rent.update(updatedRentData);
    return rent;
}


export const buscarPorUsuario = async (userId) => {
    try {
        const rents = await Emprestimo.findAll({
            where: { Usuario_ID: userId },
        });
        return rents;
    } catch (error) {
        console.error('Erro ao buscar empréstimos por usuário:', error);
        throw error;
    }
}