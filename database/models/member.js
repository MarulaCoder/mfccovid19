'use strict';

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstname: {
      type: DataTypes.STRING,
      required: true
    },
    middlename: DataTypes.STRING,
    lastname: {
      type: DataTypes.STRING,
      required: true
    },
    email: DataTypes.STRING,
    cellphone: {
      type: DataTypes.STRING,
      required: true
    },
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