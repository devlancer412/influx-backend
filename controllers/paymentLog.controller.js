const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { transactionId, amount, walletAddress, accountId } = req.body;
    const newPayment = await prisma.paymentLog.create({
      data: {
        transactionId,
        amount,
        walletAddress,
        accountId
      }
    });
  
    res.json(newPayment);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getList = async (req, res) => {
  try {
  // To Do:
  const logs = await prisma.paymentLog.findMany({});

  res.json(issues);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

module.exports = {
  store,
  getList,
}