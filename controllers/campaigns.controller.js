const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  // To Do:
  try {
    const { name, avgER, creator } = req.body
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        avgER,
        creator,
      },
    })

    res.json(newCampaign)
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
        id: accountId,
      },
      include: {
        influencer: {
          include: {
            campaigns: {
              include: {
                campaign: true,
              },
            },
          },
        },
        brand: {
          include: {
            campaigns: {
              include: {
                influencers: {
                  include: {
                    influencer: {
                      include: {
                        account: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    let campaigns = []

    if (account && account.brand) {
      campaigns = account.brand.campaigns
    } else if (account && account.influencer) {
      campaigns = account.influencer.campaigns
    }

    res.json(campaigns)
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
        id,
      },
      include: {
        influencers: {
          include: {
            influencer: {
              include: {
                account: {
                  include: {
                    telegram: true,
                    youtube: true,
                    tiktok: true,
                    twitter: true,
                    instagram: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    let totalFollowers = 0;
    campaign.influencers.forEach(influencer => {
      if (influencer.influencer.account.telegram) totalFollowers += influencer.influencer.account.telegram.channelMembers;
      if (influencer.influencer.account.instagram) totalFollowers += influencer.influencer.account.instagram.followers;
      if (influencer.influencer.account.youtube) totalFollowers += influencer.influencer.account.youtube.subscribers;
      if (influencer.influencer.account.twitter) totalFollowers += influencer.influencer.account.twitter.followers;
      if (influencer.influencer.account.tiktok) totalFollowers += influencer.influencer.account.tiktok.followers;
    })
    campaign.totalFollowers = totalFollowers;
    res.json(campaign)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const addInfluencer = async (req, res) => {
  try {
    const { campaignId, influencerId, status, negotiatedBudget } = req.body
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    })

    const influencer = await prisma.influencer.findUnique({
      where: {
        id: influencerId,
      },
    })

    if (!campaign || !influencer) return res.json('error')

    await prisma.campaignInfluencer.create({
      data: {
        campaignId,
        influencerId,
        status,
        negotiatedBudget,
      },
    })

    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        negoBudget: campaign.negoBudget + negotiatedBudget,
      },
    })

    res.json('success')
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
  addInfluencer,
  getById,
}
