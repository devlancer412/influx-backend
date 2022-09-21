const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const storeTelegram = async () => {
  // To Do:
  try {
    
    const telegram = await prisma.telegram.create({
      data: {
        username: "yyy",
        channelMembers: 400,
        accountId: 7,
        socialUrl: "https://t.me/yyy",
        averageInteractions: 2000
      }
    });

    console.log(telegram);
  
  } catch (error) {
    console.log(error)
  }  
}

const storeTwitter = async () => {
  // To Do:
  try {
    
    const twitter = await prisma.twitter.create({
      data: {
        username: "yyy",
        followers: 1900,
        accountId: 7,
        socialUrl: "https://twitter.com/yyy",
        averageImpressions: 2500
      }
    });

    console.log(twitter);
  
  } catch (error) {
    console.log(error)
  }  
}

const storeTiktok = async () => {
  // To Do:
  try {
    
    const tiktok = await prisma.tiktok.create({
      data: {
        username: "yyy",
        followers: 1700,
        accountId: 7,
        socialUrl: "https://tiktok/yyy",
        averageLikes: 100
      }
    });

    console.log(tiktok);
  
  } catch (error) {
    console.log(error)
  }  
}

const storeInstagram = async () => {
  // To Do:
  try {
    
    const instagram = await prisma.instagram.create({
      data: {
        username: "yyy",
        followers: 1400,
        accountId: 7,
        socialUrl: "https://instagram/yyy",
        averageInteractions: 1100
      }
    });

    console.log(instagram);
  
  } catch (error) {
    console.log(error)
  }  
}

const storeYoutube = async () => {
  // To Do:
  try {
    
    const youtube = await prisma.youtube.create({
      data: {
        username: "yyy",
        subscribers: 100,
        accountId: 7,
        socialUrl: "https://youtube/yyy",
        averageLikes: 1100
      }
    });

    console.log(youtube);
  
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