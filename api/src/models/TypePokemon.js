const { DataTypes } = require('sequelize');
module.exports = sequelize => {
  sequelize.define(
    'typePokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'normal',
      },
    },
    {
      timestamps: false,
    }
  );
};
