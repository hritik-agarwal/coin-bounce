import {useEffect, useState} from 'react'
import {getNews} from '../../api/external'
import styles from './Home.module.css'
import Loader from '../../components/Loader/Loader'

function Home() {
  const [articles, setArticles] = useState([])

  const handleCardClick = url => {
    window.open(url, '_blank')
  }

  useEffect(() => {
    const newsApiCall = async () => {
      const response = await getNews()

      setArticles(response.filter(article => article.urlToImage !== null))
    }
    newsApiCall()
    return () => setArticles([])
  }, [])

  if (articles.length === 0) {
    return <Loader text='homepage' />
  }

  return (
    <>
      <div className={styles.grid}>
        {articles.map(article => {
          console.log(article.urlToImage)
          return (
            <div
              key={article.url}
              className={styles.card}
              onClick={() => handleCardClick(article.url)}>
              <img src={article.urlToImage} alt='' />
              <h3>{article.title}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Home
