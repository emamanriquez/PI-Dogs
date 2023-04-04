const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  sequelize.define("Temperament", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    temperament: {
      type: DataTypes.STRING,
    },
  });
};