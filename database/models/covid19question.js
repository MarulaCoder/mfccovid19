'use strict';
module.exports = (sequelize, DataTypes) => {
  const Covid19Question = sequelize.define('Covid19Question', {
    question: DataTypes.STRING
  }, {});
  Covid19Question.associate = function(models) {
    // associations can be defined here
    Covid19Question.hasMany(models.Covid19Answer, {
      foreignKey: 'questionId',
      as: 'covid19answers',
      onDelete: 'CASCADE',
    });
  };
  return Covid19Question;
};