const Booking = require('../models/Booking');
const Spot = require('../models/Spot');

const store = async (req, res) => {
  const { user_id } = req.headers;
  const { spot_id } = req.params;

  console.log(id);
  console.log(user_id);
  try{
    const spot = await Spot.findById(id);
    if(!spot){
      return res.status(400).json({ error: "Spot not found!"});
    }

    const booking = await Booking.create({ user: user_id, spot: id, date: new Date().toString() });

    return res.json(booking);
  }catch(err){
    const { message } = err;
    return res.status(500).json({ error: message });
  }
};

module.exports = {
  store
}