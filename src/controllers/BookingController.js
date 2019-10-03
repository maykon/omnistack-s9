const Booking = require("../models/Booking");
const Spot = require("../models/Spot");

const store = async (req, res) => {
  const { user_id } = req.headers;
  const { spot_id } = req.params;
  const { date } = req.body;

  try {
    const spot = await Spot.findById(spot_id);
    if (!spot) {
      return res.status(400).json({ error: "Spot not found!" });
    }

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    return res.json(booking);
  } catch (err) {
    const { message } = err;
    return res.status(500).json({ error: message });
  }
};

module.exports = {
  store
};
