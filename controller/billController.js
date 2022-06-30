const { StatusCodes } = require('http-status-codes');
const Bill = require('../models/Bill');

exports.addBill = async (req, res) => {
  const { name, email, phone, amount } = req.body;

  if (!name || !email || !phone || !amount) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide all values' });
  }

  try {
    const bill = await Bill.create({ name, email, phone, amount });

    console.log(bill);

    return res.status(StatusCodes.OK).json(bill);
  } catch (error) {
    return res
      .status(StatusCodes.FAILED_DEPENDENCY)
      .json({ message: 'Could not add bill, try again later' });
  }
};
