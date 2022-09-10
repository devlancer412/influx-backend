const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  const { name, email, logo, isVIP, pr, region, language, loginChannel } = req.body;
  const newAccount = await prisma.account.create({
    data: {
      name,
      email, 
      logo,
      region,
      language
    }
  });

  const newInfluencer = await prisma.influencer.create({
    data: {
      accountId: newAccount.id,
      isVIP,
      pr,
      loginChannel
    }
  });

  const influencer = await prisma.influencer.findUnique({
    where: {
      id: newInfluencer.id
    },
    include: {
      account: true
    }
  });

  res.json(influencer);
}

const getList = async (req, res) => {
  // To Do:
  const influencers = await prisma.influencer.findMany({
    include: {
      account: true
    }
  });

  res.json(influencers);
}

module.exports = {
  store,
  getList
}