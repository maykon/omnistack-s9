const User = require('../models/User');
const Spot = require('../models/Spot');


const index = async(req, res) => {
  const {tech} = req.query;

  try{
    const spots = await Spot.find({techs: tech});
    return res.json(spots);
  }catch(err){
    const {message} = err;
    return res.status(500).json({error: message});
  }
};

const store = async (req, res) => {
  const { filename: thumbnail } = req.file;
  const { company, price, techs } = req.body;
  const { user_id: user } = req.headers;
  
  try{
    const user = await User.findById(user_id);
    if(!user){
      res.status(400).json({error: "User does not exists."});
    }

    let spot = await Spot.findOne({ company, user });
    if(!spot){
      spot = await Spot.create({ thumbnail, company, price, 
        techs: techs.split(',').map(tech => tech.trim()),
        user });
    }
    return res.json(spot);
  }catch(err){
    const {message} = err;
    return res.status(500).json({error: message});
  }
}

module.exports = {
  index, store
}