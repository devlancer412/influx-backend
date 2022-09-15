const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  try {
    const { id, name, email, logo, isVIP, engagementRate, region, language, loginChannel } = req.body;
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
          engagementRate,
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
          engagementRate,
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
    const { ER, language, audienceSize, userName, location, tags } = req.query
    let { minPrice, maxPrice } = req.query

    let influencers = await prisma.influencer.findMany({
      include: {
        account: {
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          }
        },
        campaigns: {
          include: {
            campaign: true
          }
        }        
      }
    })

    const tagArr = tags ? tags.split(',') : [];

    influencers = influencers.filter(influencer => 
      (!ER || ER && influencer.engagementRate === ER) && 
      (!language || language && influencer.language.toLowerCase().includes(language.toLowerCase())) &&
      (!userName ||  userName && influencer.userName.toLowerCase().includes(userName.toLowerCase())) &&
      (!location || location && influencer.region.toLowerCase().includes(location.toLowerCase()))
    )

    if (tagArr.length) {
      influencers = influencers.filter(influencer => {
        const tags = influencer.tags.map(tag => tag.tag.name)
        let matched = true
        tagArr.forEach(tag => {
          if (!tags.include(tag)) matched = false
        })
        return matched
      })
    }

    influencers.forEach(influencer => {
      const budgets = influencer.campaigns.map(campaign => campaign.campaign.negoBudget)
      influencer.priceRange = [Math.min(...budgets), Math.max(...budgets)]
    })

    minPrice = minPrice ? minPrice * 1 : 0
    maxPrice = maxPrice ? maxPrice * 1 : Number.MAX_VALUE


    influencers = influencers.filter(influencer => 
      (influencer.priceRange[1] >= minPrice && influencer.priceRange[0] <= maxPrice) ||
      (influencer.priceRange[0] <= maxPrice && influencer.priceRange[1] >= minPrice)
    )
  
    res.json(influencers)
  } catch (error) {
    console.log(error)
    res.json(error)
  }  
}

module.exports = {
  store,
  getList
}