import axios from 'axios'

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY
const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`
const CRYPTO_API_ENDPOINT =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d&locale=en'

export const getNews = async () => {
  let response
  try {
    response = await axios(NEWS_API_ENDPOINT)
    response = response.data.articles.slice(0, 20)
  } catch (error) {
    console.log(error)
  }
  return response
}

export const getCrypto = async () => {
  let response
  try {
    response = await axios(CRYPTO_API_ENDPOINT)
    response = response.data
  } catch (error) {
    return error
  }
  return response
}
