const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'pikachu',
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      stroke: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 6,
      },
      defending: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 7,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
    },
    {
      timestamps: false,
    }
  );
};
