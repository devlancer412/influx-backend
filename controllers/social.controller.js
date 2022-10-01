const { PrismaClient } = require('@prisma/client')
const axios = require('axios')
const moment = require('moment')

const prisma = new PrismaClient()

const storeTelegram = async (query, accountId) => {
  // To Do:
  return
  try {
    const telegram = await prisma.telegram.create({
      data: {
        username: 'ttt',
        channelMembers: 1000,
        accountId,
        socialUrl: 'https://t.me/ttt',
        averageInteractions: 900,
      },
    })

    console.log(telegram)
  } catch (error) {
    console.log(error)
  }
}

const storeTwitter = async (query, accountId) => {
  query = 'socialblade'
  try {
    const response = await axios.get(
      `https://matrix.sbapis.com/b/twitter/statistics?query=${query}&history=default&clientid=${process.env.SOCIAL_BLADE_CLIENT_ID}&token=${process.env.SOCIAL_BLADE_TOKEN}`,
    )

    const {
      data: {
        id: { username },
        statistics: {
          total: { followers, tweets },
        },
        daily,
      },
    } = response.data
    let twitter = await prisma.twitter.findFirst({
      where: {
        accountId,
      },
    })
    if (!twitter) {
      twitter = await prisma.twitter.create({
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://twitter.com/${username}`,
          averageImpressions: tweets,
        },
      })

      for (const day of daily) {
        await prisma.twitterHistory.create({
          data: {
            twitterId: twitter.id,
            date: moment(day.date, 'YYYY-MM-DD').toDate(),
            impressions: day.tweets,
          },
        })
      }
    } else {
      await prisma.twitter.update({
        where: {
          id: twitter.id,
        },
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://twitter.com/${username}`,
          averageImpressions: tweets,
        },
      })
      // To Do: Remove old one and create new one

      // for (const day of daily) {

      // await prisma.twitterHistory.update({
      //   where: {
      //     twitterId: twitter.id,
      //     date: day.date
      //   }
      //   data: {
      //     twitterId: twitter.id,
      //     date: day.date,
      //     impressions: day.tweets,
      //   },
      // })
      // }
    }
  } catch (error) {
    console.log(error)
  }
}

const storeTiktok = async (query, accountId) => {
  query = 'socialblade'
  try {
    const response = await axios.get(
      `https://matrix.sbapis.com/b/tiktok/statistics?query=${query}&history=default&clientid=${process.env.SOCIAL_BLADE_CLIENT_ID}&token=${process.env.SOCIAL_BLADE_TOKEN}`,
    )

    const {
      data: {
        id: { username },
        statistics: {
          total: { followers, likes },
        },
        daily,
      },
    } = response.data

    let tiktok = await prisma.tiktok.findFirst({
      where: {
        accountId,
      },
    })
    if (!tiktok) {
      tiktok = await prisma.tiktok.create({
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://tiktok.com/@${username}`,
          averageLikes: likes,
        },
      })

      for (const day of daily) {
        await prisma.tiktokHistory.create({
          data: {
            tiktokId: tiktok.id,
            date: moment(day.date, 'YYYY-MM-DD').toDate(),
            likes: day.likes,
          },
        })
      }
    } else {
      await prisma.tiktok.update({
        where: {
          id: tiktok.id,
        },
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://tiktok.com/@${username}`,
          averageLikes: likes,
        },
      })
      // To Do: Remove old one and create new one
    }
  } catch (error) {
    console.log(error)
  }
}

const storeInstagram = async (query, accountId) => {
  query = 'socialblade'
  try {
    const response = await axios.get(
      `https://matrix.sbapis.com/b/instagram/statistics?query=${query}&history=default&clientid=${process.env.SOCIAL_BLADE_CLIENT_ID}&token=${process.env.SOCIAL_BLADE_TOKEN}`,
    )

    const {
      data: {
        id: { username },
        statistics: {
          total: { followers },
          average: { likes, comments },
        },
        daily,
      },
    } = response.data

    let instagram = await prisma.instagram.findFirst({
      where: {
        accountId,
      },
    })
    if (!instagram) {
      instagram = await prisma.instagram.create({
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://instagram.com/${username}`,
          averageInteractions: Math.floor(likes + comments),
        },
      })

      for (const day of daily) {
        await prisma.instagramHistory.create({
          data: {
            instagramId: instagram.id,
            date: moment(day.date, 'YYYY-MM-DD').toDate(),
            interactions: Math.floor(day.avg_likes + day.avg_comments),
          },
        })
      }
    } else {
      await prisma.instagram.update({
        where: {
          id: instagram.id,
        },
        data: {
          username,
          followers,
          accountId,
          socialUrl: `https://instagram.com/${username}`,
          averageInteractions: Math.floor(likes + comments),
        },
      })
      // To Do: Remove old one and create new one
    }
  } catch (error) {
    console.log(error)
  }
}

const storeYoutube = async (query, accountId) => {
  query = 'socialblade'
  try {
    const response = await axios.get(
      `https://matrix.sbapis.com/b/youtube/statistics?query=${query}&history=default&clientid=${process.env.SOCIAL_BLADE_CLIENT_ID}&token=${process.env.SOCIAL_BLADE_TOKEN}`,
    )

    const {
      data: {
        id: { username },
        statistics: {
          total: { subscribers, views },
        },
        daily,
      },
    } = response.data

    let youtube = await prisma.youtube.findFirst({
      where: {
        accountId,
      },
    })
    if (!youtube) {
      youtube = await prisma.youtube.create({
        data: {
          username,
          subscribers,
          accountId,
          socialUrl: `https://youtube.com/c/${username}`,
          averageViews: views,
        },
      })

      for (const day of daily) {
        await prisma.youtubeHistory.create({
          data: {
            youtubeId: youtube.id,
            date: moment(day.date, 'YYYY-MM-DD').toDate(),
            views: day.views,
            subscribers: day.subs,
          },
        })
      }
    } else {
      await prisma.youtube.update({
        where: {
          id: youtube.id,
        },
        data: {
          username,
          subscribers,
          accountId,
          socialUrl: `https://youtube.com/c/${username}`,
          averageViews: views,
        },
      })
      // To Do: Remove old one and create new one
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  storeTelegram,
  storeTiktok,
  storeTwitter,
  storeInstagram,
  storeYoutube,
}
