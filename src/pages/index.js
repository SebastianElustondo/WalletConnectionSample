import { useCallback, useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'

export default function Home() {
const { 
  activate,
  active,
  deactivate,
  error,
  account,
  chainId
} = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') 
    connect()
  }, [connect])

  const disconnect = () => {
    deactivate()
    localStorage.removeitem('previouslyConnected')
  }

  if (error) {
    return <p>An error with the connection has ocurred</p>
  }
  return (
    <div className={styles.container}>
      <h1>Connection with wallet</h1>
      {
        active 
        ?
        <>
        <button onClick={disconnect}>
          Disconnect Wallet
          </button>
          <p>
            You are connected to {chainId} network. <br />
            Your account is: {account}
          </p>
        </>
        : <button onClick={connect}>Connect wallet</button>
      }
      
    </div>
  )
}
