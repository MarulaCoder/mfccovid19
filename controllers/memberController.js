const memberModel = require("../database/models");
//const addressModel = require("../database/models").Address;
const { body } = require("express-validator");

//const mf = require('../memcached/memcached');

var memjs = require('memjs');
var mcClient = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
});




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
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    transaction = await memberModel.sequelize.transaction();

    const newMember = await memberModel.Member.create( member, {
      transaction: transaction
    })
    var address = {
      streetnumber: req.body.streetnumber,
      streetname: req.body.streetname,
      unitnumber: req.body.unitnumber,
      complex: req.body.complex,
      suburb: req.body.suburb,
      city: req.body.city,
      province: req.body.province,
      code: req.body.code,
      memberId: newMember.id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await memberModel.Address.create(address, {
      transaction: transaction
    });

    //commit changes
    await transaction.commit();

    //update cache with new member
    var allMembers = await memberModel.Member.findAll();
    //mcClient.set('membersdata', 300, JSON.stringify(allMembers));
    mcClient.set('membersdata', JSON.stringify(allMembers), {expires:300}, (err, val) => 
        {
          /* handle error */
          if(err != null) {
            console.log('Error setting value: ' + err);
          }
        });

    //res.json(newEmployee)
    res.render('members', {memberResult: newMember, message: "Member " + member.firstname + " " + member.lastname + " added succesfully."});

  } 
  catch(error) 
  {
    if(transaction) {
      await transaction.rollback()
    }
    console.log(error.message);
    res.render('error', { message: 'Failed to create member.' });
    // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
  }
};

// Retrieve all Member from the database.
exports.getAllMembers = async (req, res) => 
{
  try 
  {
    const allMembers = "";
    var key = 'membersdata';
    /*
    mf.getInstance().get(key, (error, value) => {
      if (error) {
        // handle error here
        console.log(error.message);
      }else{
        // we have a value
        console.log(`The value is ${value}`); 
      }
    });
    */

   mcClient.get('membersdata', async (err, result) => 
    {
      if (err == null && result != null) 
      {
        allMembers = result;
      }
      else
      {
        allMembers = await memberModel.Member.findAll();
        mcClient.set('membersdata', JSON.stringify(allMembers), {expires:300}, (err, val) => 
        {
          /* handle error */
          if(err != null) {
            console.log('Error setting value: ' + err);
          }
        });
        //mc.set(prime_key, '' + prime, {expires:0}, function(err, val){/* handle error */})
      }

      //res.json(newEmployee)
      res.render('members', {memberResult: allMembers, message: "All members retrieved succesfully."});

    });
  } 
  catch(error) 
  {
    if(transaction) {
      await transaction.rollback()
    }
    console.log(error.message);
    res.render('error', { message: 'Failed to get all members.' });
    // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
  }
};

// Find a single Member with an id
exports.findOneMember = (req, res) => 
{
  
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
