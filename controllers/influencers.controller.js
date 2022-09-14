const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  try {
    const { id, name, email, logo, isVIP, pr, region, language, loginChannel } = req.body;
    let influencerId
    if (!id) {
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

      influencerId = newInfluencer.id
    } else {
      await prisma.account.update({
        where: {
          id
        },
        data: {
          name,
          email, 
          logo,
          region,
          language
        }
      })

      const influencer = await prisma.influencer.update({
        where: {
          accountId: id
        },
        data: {
          isVIP,
          pr,
          loginChannel
        }
      })
      influencerId = influencer.id
    }

    const influencer = await prisma.influencer.findUnique({
      where: {
        id: influencerId
      },
      include: {
        account: true
      }
    });
  
    res.json(influencer);
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getList = async (req, res) => {
  try {
    // To Do: filter

    const influencers = await prisma.influencer.findMany({
      include: {
        account: {
          include: {
            tags: true
          }
        },
        campaigns: true,
      }
    });
  
    res.json(influencers);
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

module.exports = {
  store,
  getList
}