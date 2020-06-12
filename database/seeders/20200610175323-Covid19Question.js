'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   //seed question data
    return queryInterface.bulkInsert('Covid19Questions', [
      {
        question: 'Have you travelled in the last 7 days',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Did you attend a funeral in the last 7 days',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Have you been in contact with a COVID-19 patient',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Have you visited a doctor or hospital in the last 7 days',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Have you tested for COVID-19 in the last 7 days',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Is anyone in your family affected with COVID-19',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
