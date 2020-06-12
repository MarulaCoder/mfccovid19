const memberModel = require("../database/models");
//const addressModel = require("../database/models").Address;
//const { body } = require("express-validator");
//const { where } = require("sequelize/types");

//const mf = require('../memcached/memcached');

/*
var memjs = require('memjs');
var mcClient = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
});
*/

const covid19Questions = [
	{
		id: 1,
		question: "Have you travelled in the last 7 days"
	},
	{
		id: 2,
		question: "Did you attend a funeral in the last 7 days"
	},
	{
		id: 3,
		question: "Have you been in contact with a COVID-19 patient"
	},
	{
		id: 4,
		question: "Have you visited a doctor or hospital in the last 7 days"
	},
	{
		id: 5,
		question: "Have you tested for COVID-19 in the last 7 days"
	},
	{
		id: 6,
		question: "Is anyone in your family affected with COVID-19"
	},
];


// Create and Save a new Member
exports.createMember = async (req, res) => {

  let transaction;
  try 
  {
    var member = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      cellphone: req.body.cellphone,
      isadmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    transaction = await memberModel.sequelize.transaction();

    const newMember = await memberModel.Member.create( member, {
      transaction: transaction
    })
    var address = {
      streetnumber: req.body.streetnumber,
      streetname: req.body.streetname,
      unitnumber: req.body.unitnumber,
      complexname: req.body.complexname,
      suburb: req.body.suburb,
      city: req.body.city,
      province: req.body.province,
      code: req.body.code,
      memberId: newMember.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await memberModel.Address.create(address, {
      transaction: transaction
    });

    //commit changes
    await transaction.commit();

    //res.json(newEmployee)
    res.redirect('/member/all', { message: "Member " + member.firstname + " " + member.lastname + " added succesfully."});

  } 
  catch(error) 
  {
    // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
    if(transaction) {
      await transaction.rollback()
    }
    console.log(error.message);
    res.render('error', { message: 'Failed to create member.' });
  }
};


// Retrieve all Members from the database.
exports.getAllMembers = async (req, res, next) => 
{
  var allMembers = {};
  try
  {
    allMembers = await memberModel.Member.findAll();
    if(allMembers != null)
    {
      res.render('members', {memberResult: allMembers, message: "All members retrieved succesfully."});
    }
    else
    {
      res.render('members', {memberResult: null, message: "No members found."});
    }
  }
  catch
  {
    // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
    if(transaction) {
      await transaction.rollback();
    }
    console.log(error.message);
    res.render('error', { message: 'Failed to get all members.' });
  }
};

// Find a single Member with an id
exports.findOneMember = async (req, res) => 
{
  const memId = req.params.id;
  var memberData;

  await memberModel.Address.findOne({
    where: {memberId:memId},
    include: [
      {
        model: memberModel.Member,
        as: 'member',
        include: [
          {
            model: memberModel.Covid19Answer,
            as: 'covid19answers'
          }
        ]
      }
    ]
  })
  .then(aData => {
    memberData = aData;
    //create answers
    var covid19Ans = [];
    memberData.member.covid19answers.forEach(element => {
      covid19Questions.forEach(ques => {
        if(ques.id == element.questionId)
        {
          covid19Ans.push({
            c19Ques: ques.question,
            c19ans: element.answer
          });
        }
      });
    });
    res.render('member-view', {memberResult: memberData, memberAddrResult: covid19Ans, message: "Member retrieved succesfully."});
  })
  .catch(err => {
    console.log(err.message);
    res.render('error', { message: 'Failed to get member details.'});
  })
};

// Update a Member by the id in the request
exports.updateMember = (req, res) => 
{
  
};

// Delete a Member with the specified id in the request
exports.deleteMember = (req, res) => 
{
  
};

// Delete all Member from the database.
exports.deleteAllMembers = (req, res) => 
{
  
};

// Submits covid19 form from the database.
exports.formSubmit = async (req, res) => 
{
  let transaction;
  try 
  {
    const memId = req.body.memId;
    transaction = await memberModel.sequelize.transaction();

    const newMember = await memberModel.Covid19Answer.bulkCreate([
      {
        questionId: 1,
        memberId: memId,
        answer: req.body.covid19Q1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        memberId: memId,
        answer: req.body.covid19Q2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        memberId: memId,
        answer: req.body.covid19Q3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        memberId: memId,
        answer: req.body.covid19Q4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        memberId: memId,
        answer: req.body.covid19Q5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 6,
        memberId: memId,
        answer: req.body.covid19Q6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], 
    {
      transaction: transaction
    })

    //commit changes
    await transaction.commit();

    //res.json(newEmployee)
    res.redirect('/member/all');

  } 
  catch(error) 
  {
    // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
    if(transaction) {
      await transaction.rollback()
    }
    console.log(error.message);
    res.render('error', { message: 'Failed to save form data.' });
  }
};
