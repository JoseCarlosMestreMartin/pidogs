const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    heightMin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weightMin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lifeSpanMin: {
      type: DataTypes.INTEGER,
    },
    lifeSpanMax: {
      type: DataTypes.INTEGER,
    },
    isCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false, }
  );
};
