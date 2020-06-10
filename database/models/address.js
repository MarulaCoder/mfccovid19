'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    streetnumber: DataTypes.STRING,
    streetname: DataTypes.STRING,
    unitnumber: DataTypes.STRING,
    complexname: DataTypes.STRING,
    suburb: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    code: DataTypes.STRING,
    memberId: DataTypes.INTEGER
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.Member, {
      foreignKey: 'memberId',
      as: 'member',
      onDelete: 'CASCADE',
    })
  };
  return Address;
};