const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { name, avgER, negoBudget, creator } = req.body;
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        avgER,
        negoBudget,
        creator
      }
    });
  
    res.json(newCampaign);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getList = async (req, res) => {
  try {
    let { accountId } = req.params
    accountId = parseInt(accountId)

    const account = await prisma.account.findUnique({
      where: {
        id: accountId
      },
      include: {
        influencer: {
          include: {
            campaigns: {
              include: {
                campaign: true
              }
            }
          }
        },
        brand: {
          include: {
            campaigns: true
          }
        }
      }
    })

    let campaigns = []

    if (account && account.brand) {
      campaigns = account.brand.campaigns
    } else if (account && account.influencer) {
      campaigns = account.influencer.campaigns
    }

    res.json(campaigns); 
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getById = async (req, res) => {
  try {
    let { id } = req.params
    id = parseInt(id)

    const campaign = await prisma.campaign.findUnique({
      where: {
        id
      }
    })
    
    res.json(campaign)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const addInfluencer = async (req, res) => {
  try {
      const { campaignId, influencerId, status } = req.body
      const campaign = await prisma.campaign.findUnique({
        where:{
          id: campaignId
        }
      })

      const influencer = await prisma.influencer.findUnique({
        where: {
          id: influencerId
        }
      })

      if (!campaign || !influencer) return res.json("error")

      await prisma.campaignInfluencer.create({
        data:{
          campaignId,
          influencerId,
          status
        }
      });

      res.json("success")
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
  addInfluencer,
  getById
}