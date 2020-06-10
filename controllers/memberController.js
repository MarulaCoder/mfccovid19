const models = require("../database/models");

const createMember = async (req, res) => 
{
  
  try 
  {
    const member = await models.Member.create(req.body);

    return res.status(201).json({
        member
    });
  }
  catch (error) 
  {
    return res.status(500).json({ error: error.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await models.Member.findAll();
    
    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



module.exports = {
  createMember,
  getAllMembers
  //getAllPosts,
  //getPostById,
  //updatePost,
  //deletePost
};