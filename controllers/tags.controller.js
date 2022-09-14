const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { name } = req.body;
    const newTag = await prisma.tag.create({
      data: {
        name,
      }
    });
  
    res.json(newTag);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getList = async (req, res) => {
  
  try {
  // To Do:
  const tags = await prisma.tag.findMany({});

  res.json(tags);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const addTag = async (req, res) => {
  try {
      const { tagId, accountId } = req.body

      const tag = await prisma.tag.findUnique({
        where: {
          id: tagId
        }
      })

      const account = await prisma.account.findUnique({
        where: {
          id: accountId
        }
      })

      if (!tag || !account) {
        return res.json("error")
      }

      await prisma.accountTag.create({
        data:{
          tagId,
          accountId
        }
      });

      return res.json("success")
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
  addTag
}