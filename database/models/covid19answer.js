'use strict';
module.exports = (sequelize, DataTypes) => {
  const Covid19Answer = sequelize.define('Covid19Answer', {
    questionId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {});
  Covid19Answer.associate = function(models) {
    // associations can be defined here
    Covid19Answer.belongsTo(models.Member, {
      foreignKey: 'memberId',
      as: 'member'
    });
    Covid19Answer.belongsTo(models.Covid19Question, {
      foreignKey: 'questionId',
      as: 'covid19question'
    });
  };
  return Covid19Answer;
};