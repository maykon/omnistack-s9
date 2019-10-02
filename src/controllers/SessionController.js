const User = require('../models/User');

const store = async (req, res) => {
  const { email } = req.body;
  try{
    let user = await User.findOne({ email });
    if(!user){
      user = await User.create({ email });
    }
    return res.json(user);
  }catch(err){
    const {message} = err;
    return res.json({error: message});
  }
}

module.exports = {
  store
}