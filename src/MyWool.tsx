import { Box, Heading } from '@chakra-ui/react'
import { StatGroup } from '@chakra-ui/stat'
import { useWallet } from './context/wallet'
import { useContract } from './hooks/useContract'
import { WOOL_CONTRACT_ADDRESS } from './constants'
import woolAbi from './constants/woolAbi.json'
import { useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { utils } from 'ethers'
import StatItem from './StatItem'
import { Ticker } from './types'

type Props = {
  stats?: Ticker
}

function useMyWool() {
  const { currentAccount } = useWallet()
  const contract = useContract(WOOL_CONTRACT_ADDRESS, woolAbi)
  const [woolAmount, setWoolAmount] = useState<number | null>(null)

  useEffect(() => {
    const getWool = async () => {
      if (currentAccount && contract) {
        const gweiResult = (await contract.balanceOf(
          currentAccount
        )) as BigNumber
        const amount = parseFloat(utils.formatEther(gweiResult))
        setWoolAmount(amount)
      }
    }
    getWool()
  }, [currentAccount, contract])
  return woolAmount
}

function MyWool({ stats }: Props) {
  const myWool = useMyWool()
  return (
    <Box
      border="1px solid lightgray"
      borderRadius="lg"
      p="5"
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Heading size="md" pb="1">
        My $WOOL
      </Heading>
      {myWool !== null && stats ? (
        <>
          <StatGroup gridRowGap="4">
            <StatItem label="$WOOL">{myWool.toPrecision(4)}</StatItem>
            <StatItem label="USD">
              ${(stats.converted_last.usd * myWool).toPrecision(4)}
            </StatItem>
            <StatItem label="ETH">
              {(stats.converted_last.eth * myWool).toPrecision(4)}Ξ
            </StatItem>
          </StatGroup>
        </>
      ) : null}
    </Box>
  )
}

export default MyWool
