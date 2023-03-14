const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "temperament",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true, // es la llave primaria
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //
      },
    },
    { timestamps: false }
  );
};
