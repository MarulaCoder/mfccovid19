const Sequelize = require('sequelize');
//postgres://njkxorohczavfz:4e6697befe3ddeff41bb4cd4e60cc81cfa689bf3efff57abecc461a4b7ca6826@ec2-54-247-89-181.eu-west-1.compute.amazonaws.com:5432/datkb2031uh5mr
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
const sequelize = new Sequelize('postgres://njkxorohczavfz:4e6697befe3ddeff41bb4cd4e60cc81cfa689bf3efff57abecc461a4b7ca6826@ec2-54-247-89-181.eu-west-1.compute.amazonaws.com:5432/datkb2031uh5mr');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

exports.saveToDB = () => {

};
