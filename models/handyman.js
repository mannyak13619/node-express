const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class handyman extends Model { };

handyman.init(
  {
    handyman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    trade: {
      type: DataTypes.STRING,
    },
    job: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    reminder: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet',
  }
);

module.exports = Pet;