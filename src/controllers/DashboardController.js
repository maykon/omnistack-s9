const Spot = require('../models/Spot');

const show = async (req, res) => {
  const { user_id } = req.headers;
  try{
    const spots = await Spot.find({ user: user_id});
    return res.json(spots);
  }catch(err){
    const { message } = err;
    return res.status(500).json({ error: message });
  }
};

module.exports = {
  show
}