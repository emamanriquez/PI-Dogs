const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null"
        }
      }
    },
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    min_height:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null"
        }
      }
    },
    max_height:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null"
        }
      }
    },
    min__weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null",
        },
      },
    },
    max__weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null",
        },
      },
    },
    life_spam:{
      type: DataTypes.STRING,
    }
  });
};
