import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeConfig.js';


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM('Administrador', 'Aluno','Professor'),
        allowNull: false,
    }
}, {
    tableName: 'usuario', // Nome da tabela
    timestamps: false // Não cria colunas `createdAt` e `updatedAt`
  });


export default User;
