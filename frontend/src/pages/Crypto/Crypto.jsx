import {useEffect, useState} from 'react'
import {getCrypto} from '../../api/external'
import styles from './Crypto.module.css'
import Loader from '../../components/Loader/Loader'

function Crypto() {
  const [data, setData] = useState([])

  useEffect(() => {
    const cryptoApiCall = async () => {
      const response = await getCrypto()
      setData(response)
    }
    cryptoApiCall()
    return () => setData([])
  }, [])

  if (data.length === 0) {
    return <Loader text='cryptocurrencies' />
  }

  const negativeStyle = {
    color: '#ea3943',
  }

  const positiveStyle = {
    color: '#16c784',
  }

  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin, index) => {
          return (
            <tr key={coin.index} className={styles.row}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <div className={styles.logo}>
                  <img src={coin.image} width={40} height={40} alt='' />{' '}
                  {coin.name}
                </div>
              </td>
              <td>{coin.symbol}</td>
              <td>{coin.current_price}</td>
              <td
                style={
                  coin.price_change_percentage_24h < 0
                    ? negativeStyle
                    : positiveStyle
                }>
                {coin.price_change_percentage_24h}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Crypto
