const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { accountId, issue } = req.body;
    
    const account = await prisma.account.findUnique({
      where: {
        id: accountId
      }
    })

    if (!account) return res.json("error")

    const newIssue = await prisma.issuesReport.create({
      data: {
        accountId,
        issue
      }
    });
  
    res.json(newIssue);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getList = async (req, res) => {
  try {
  // To Do:
  const issues = await prisma.issuesReport.findMany({});

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