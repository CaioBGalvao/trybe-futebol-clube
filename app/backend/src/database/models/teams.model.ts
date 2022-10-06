/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

// Acho que para setar (set) um valor de caracteres para um string é necessário usar o DataTypes.STRING com o contrutor new para incerir um valor.
// https://sequelize.org/docs/v6/other-topics/typescript/#usage

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true, // Converte camelCase para snake_case dentro do banco
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
