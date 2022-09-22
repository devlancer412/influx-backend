const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const store = async (req, res) => {
  try {
    const {
      accountId,
      name,
      email,
      logo,
      region,
      language,
      desc,
      salesPhase,
      budget,
      isVetted,
      pdfAudit,
      pdfReview,
      profileLive,
    } = req.body

    let brandId
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

      const newBrand = await prisma.brand.create({
        data: {
          accountId: newAccount.id,
          desc,
          salesPhase,
          budget,
          isVetted,
          pdfAudit,
          pdfReview,
          profileLive,
        },
      })

      brandId = newBrand.id
    } else {
      if (!(await prisma.brand.findUnique({ where: { accountId } })))
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

      const brand = await prisma.brand.update({
        where: {
          accountId,
        },
        data: {
          desc,
          salesPhase,
          budget,
          isVetted,
          pdfAudit,
          pdfReview,
          profileLive,
        },
      })

      brandId = brand.id
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
      include: {
        account: true,
      },
    })

    res.json(brand)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getList = async (req, res) => {
  try {
    // To Do:
    const brands = await prisma.brand.findMany({
      include: {
        account: true,
      },
    })

    res.json(brands)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getById = async (req, res) => {
  const { id } = req.params
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: id * 1,
      },
      include: {
        account: true,
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
    })
    res.json(brand)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getBrandIdByEmail = async (req, res) => {
  const { email } = req.params
  try {
    const account = await prisma.account.findFirst({
      where: {
        email,
      },
      include: {
        brand: true,
      },
    })
    if (!account || !account.brand) return res.json('Brand does not exist')
    res.json(account.brand.id)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  store,
  getList,
  getById,
  getBrandIdByEmail,
}
