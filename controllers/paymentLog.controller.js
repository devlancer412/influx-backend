const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { transactionId, amount, walletAddress, accountId } = req.body;

    const account = await prisma.account.findUnique({
      where: {
        id: accountId
      }
    })

    if (!account) return res.status(400).json("The account doesn't exist")

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
    res.status(400).json(error)
  }  
}

const getList = async (req, res) => {
  try {
  // To Do:
  const logs = await prisma.paymentLog.findMany({});

  res.json(logs);  
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }  
}

module.exports = {
  store,
  getList,
}