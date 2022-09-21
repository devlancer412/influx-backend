const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  try {
    const {
      accountId,
      name,
      email,
      logo,
      isVIP,
      engagementRate,
      region,
      language,
      loginChannel,
      mainChannel,
      nicke,
      contactLink,
    } = req.body
    let influencerId
    if (!accountId) {
      const newAccount = await prisma.account.create({
        data: {
          name,
          email,
          logo,
          region,
          language,
        },
      })

      const newInfluencer = await prisma.influencer.create({
        data: {
          accountId: newAccount.id,
          isVIP,
          engagementRate,
          loginChannel,
          mainChannel,
          nicke,
          contactLink,
        },
      })

      influencerId = newInfluencer.id
    } else {
      if (!(await prisma.influencer.findUnique({ where: { accountId } })))
        return res.json('error')

      await prisma.account.update({
        where: {
          id: accountId,
        },
        data: {
          name,
          email,
          logo,
          region,
          language,
        },
      })

      const influencer = await prisma.influencer.update({
        where: {
          accountId,
        },
        data: {
          isVIP,
          engagementRate,
          loginChannel,
          mainChannel,
          nicke,
          contactLink,
        },
      })
      influencerId = influencer.id
    }

    const influencer = await prisma.influencer.findUnique({
      where: {
        id: influencerId,
      },
      include: {
        account: true,
      },
    })

    res.json(influencer)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getList = async (req, res) => {
  try {
    // To Do: filter
    const { ER, language, audienceSize, userName, location } = req.query
    let { minPrice, maxPrice } = req.query

    let influencers = await prisma.influencer.findMany({
      include: {
        account: {
          include: {
            telegram: true,
            twitter: true,
            tiktok: true,
            instagram: true,
            youtube: true,
          },
        },
        campaigns: {
          include: {
            campaign: true,
          },
        },
      },
    })

    // const tagArr = tags ? tags.split(',') : []

    influencers = influencers.filter(
      (influencer) =>
        (!ER || (ER && influencer.engagementRate === ER)) &&
        (!language ||
          (language &&
            influencer.account.language
              .toLowerCase()
              .includes(language.toLowerCase()))) &&
        (!userName ||
          (userName &&
            influencer.account.name
              .toLowerCase()
              .includes(userName.toLowerCase()))) &&
        (!location ||
          (location &&
            influencer.account.region
              .toLowerCase()
              .includes(location.toLowerCase()))),
    )

    // if (tagArr.length) {
    //   influencers = influencers.filter((influencer) => {
    //     if (!influencer.account.tags) return false
    //     const tags = influencer.account.tags.map((tag) => tag.tag.name)
    //     console.log(tags)
    //     let matched = true
    //     tagArr.forEach((tag) => {
    //       if (!tags.includes(tag)) matched = false
    //     })
    //     return matched
    //   })
    // }

    influencers.forEach((influencer) => {
      const budgets = influencer.campaigns.map(
        (campaign) => campaign.campaign.negoBudget,
      )
      influencer.priceRange = [Math.min(...budgets), Math.max(...budgets)]
    })

    minPrice = minPrice ? minPrice * 1 : 0
    maxPrice = maxPrice ? maxPrice * 1 : Number.MAX_VALUE

    influencers = influencers.filter(
      (influencer) =>
        (influencer.priceRange[1] >= minPrice &&
          influencer.priceRange[0] <= maxPrice) ||
        (influencer.priceRange[0] <= maxPrice &&
          influencer.priceRange[1] >= minPrice),
    )

    res.json(influencers)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getById = async (req, res) => {
  const { id } = req.params
  try {
    const influencer = await prisma.influencer.findUnique({
      where: {
        id: id * 1,
      },
      include: {
        account: true,
        campaigns: {
          include: {
            campaign: true,
          },
        },
      },
    })

    res.json(influencer)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
  getById,
}
