const { StatusCodes } = require('http-status-codes');
const Bill = require('../models/Bill');

exports.addBill = async (req, res) => {
  const { name, email, phone, amount } = req.body;

  if (!name || !email || !phone || !amount) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide all values' });
  }

  try {
    const bill = await Bill.create({ name, email, phone, amount });

    return res.status(StatusCodes.CREATED).json(bill);
  } catch (error) {
    return res
      .status(StatusCodes.FAILED_DEPENDENCY)
      .json({ message: 'Could not add bill, try again later' });
  }
};

exports.getBills = async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json(bills);
};

exports.updateBill = async (req, res) => {
  const { id } = req.params;

  const { name, email, phone, amount } = req.body;

  const bill = await Bill.findByIdAndUpdate(id, { name, email, phone, amount }, { new: true });
  console.log(bill);
  if (bill) {
    res.status(StatusCodes.OK).json(bill);
  }
};

exports.deleteBill = async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.findByIdAndDelete(id).exec();

  if (bill) {
    return res.status(StatusCodes.OK).json(bill);
  }

  return res.status(StatusCodes.FAILED_DEPENDENCY).json({ message: 'Could not delete.' });
};
