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
  const { search } = req.query;
  let result;
  let totalBills;
  if (search) {
    const query = { $regex: search, $options: 'i' };
    result = Bill.find({ $or: [{ name: query }, { email: query }, { phone: query }] });
  } else {
    result = Bill.find();
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  if (search) {
    const query = { $regex: search, $options: 'i' };

    totalBills = await Bill.countDocuments({
      $or: [{ name: query }, { email: query }, { phone: query }],
    });
  } else {
    totalBills = await Bill.countDocuments();
  }

  const numOfPages = Math.ceil(totalBills / limit);

  const bills = await result.sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({ bills, numOfPages });
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
