const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    image: {
      type: DataTypes.STRING,
    },
    min_height:{
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    max_height:{
      type: DataTypes.STRING,
      allowNull: false,
      
      
    },
    min__weight: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    max__weight: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    life_spam:{
      type: DataTypes.STRING,
      allowNull : false,
    }
  });
};
