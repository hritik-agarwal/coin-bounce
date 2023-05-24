import {useEffect, useState} from 'react'
import {getCrypto} from '../../api/external'
import styles from './Crypto.module.css'
import Loader from '../../components/Loader/Loader'

function Crypto() {
  const [data, setData] = useState([])

  const rounded = (val) => {
    return Math.round(val * 1000) / 1000
  }

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
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
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
                  coin.price_change_percentage_1h_in_currency < 0
                    ? negativeStyle
                    : positiveStyle
                }>
                {rounded(coin.price_change_percentage_1h_in_currency)}%
              </td>
              <td
                style={
                  coin.price_change_percentage_24h_in_currency < 0
                    ? negativeStyle
                    : positiveStyle
                }>
                {rounded(coin.price_change_percentage_24h_in_currency)}%
              </td>
              <td
                style={
                  coin.price_change_percentage_7d_in_currency < 0
                    ? negativeStyle
                    : positiveStyle
                }>
                {rounded(coin.price_change_percentage_7d_in_currency)}%
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Crypto
