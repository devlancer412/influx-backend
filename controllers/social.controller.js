const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

const storeTelegram = async () => {
  // To Do:
  try {
    const telegram = await prisma.telegram.create({
      data: {
        username: 'yyy',
        channelMembers: 400,
        accountId: 7,
        socialUrl: 'https://t.me/yyy',
        averageInteractions: 2000,
      },
    })

    console.log(telegram)
  } catch (error) {
    console.log(error)
  }
}

const storeTwitter = async () => {
  // To Do:
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

    console.log(username, followers, tweets, daily)

    const twitter = await prisma.twitter.create({
      data: {
        username,
        followers,
        accountId,
        socialUrl: `https://twitter.com/${username}`,
        averageImpressions: 2500,
      },
    })

    console.log(twitter)
  } catch (error) {
    console.log(error)
  }
}

const storeTiktok = async (query, accountId) => {
  // To Do:
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

    console.log(username, followers, likes, daily)

    const tiktok = await prisma.tiktok.create({
      data: {
        username,
        followers,
        accountId,
        socialUrl: `https://tiktok.com/@${username}`,
        averageLikes: likes,
      },
    })

    console.log(tiktok)
  } catch (error) {
    console.log(error)
  }
}

const storeInstagram = async (query, accountId) => {
  // To Do:
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

    console.log(username, followers, likes, comments, daily)

    const instagram = await prisma.instagram.create({
      data: {
        username,
        followers,
        accountId,
        socialUrl: `https://instagram.com/${username}`,
        averageInteractions: Math.floor(likes + comments),
      },
    })

    console.log(instagram)
  } catch (error) {
    console.log(error)
  }
}

const storeYoutube = async (query, accountId) => {
  // To Do:
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

    console.log(username, subscribers, views, daily)

    const youtube = await prisma.youtube.create({
      data: {
        username,
        subscribers,
        accountId,
        socialUrl: `https://youtube.com/c/${username}`,
        averageLikes: 1100,
      },
    })

    console.log(youtube)
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
