'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
    Member.hasOne(models.Address, {
      foreignKey: 'memberId',
      as: 'addresses',
      onDelete: 'CASCADE',
    });

    Member.hasMany(models.Covid19Answer, {
      foreignKey: 'memberId',
      as: 'covid19answers',
      onDelete: 'CASCADE',
    });
  };
  return Member;
};