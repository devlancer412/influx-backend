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
  // To Do:
  const campaigns = await prisma.influencer.findMany({});

  res.json(campaigns);  
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const campaign = await prisma.campaign.findUnique({
      where: {
        campaignId: id
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
      const { campaignId, influencerId } = req.body
      await prisma.campaignInfluencer.create({
        data:{
          campaignId,
          influencerId
        }
      });
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