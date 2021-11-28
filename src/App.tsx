import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
	Box,
	Container,
	Flex,
	Grid,
	Heading,
	IconButton,
	useColorMode,
} from "@chakra-ui/react"

import CollectionStatCard from "./CollectionStatCard"
import TokenStatCard from "./TokenStatCard"
import useStatsQuery from "./hooks/useStatsQuery"
import useWoolQuery from "./hooks/useWoolQuery"
import MetaMaskConnect from "./MetaMaskConnect"
import MyWool from "./MyWool"

function App() {
	const { colorMode, toggleColorMode } = useColorMode()
	const { data: woolData } = useWoolQuery()
	const { data: wolfGame } = useStatsQuery("wolf-game")
	const { data: wolfGameMigrated } = useStatsQuery("wolf-game-migrated")
	const { data: wolfGameLand } = useStatsQuery("wolf-game-land")
	const { data: wolfGameFarmer } = useStatsQuery("wolf-game-farmer")

	const ethTickerData = woolData?.tickers.find(
		(ticker) => ticker.target === "ETH"
	)

	return (
		<div>
			<Box p={5} bg="#39e350" alignItems="flex-end" display="flex">
				<MetaMaskConnect/>
			</Box>
			<Box as='header' py='5'>
				<Container>
					<Flex justifyContent='space-between'>
						<Heading>Wolf Game Stats</Heading>
						<IconButton
							aria-label='toggle color mode'
							icon={
								colorMode === "light" ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)
							}
							onClick={toggleColorMode}
						/>
					</Flex>
				</Container>
			</Box>
			<main>
				<Container>
					<Grid templateColumns='1fr' gap='6'>
						<MyWool stats={ethTickerData}/>


						<TokenStatCard title='$WOOL' stats={ethTickerData} />
						<CollectionStatCard
							title='Wolf Game'
							collection='wolf-game'
							stats={wolfGame?.stats}
						/>
						<CollectionStatCard
							title='Wolf Game Migrated'
							collection='wolf-game-migrated'
							stats={wolfGameMigrated?.stats}
						/>
						<CollectionStatCard
							title='Land'
							collection='wolf-game-land'
							stats={wolfGameLand?.stats}
						/>
						<CollectionStatCard
							title='Farmer'
							collection='wolf-game-farmer'
							stats={wolfGameFarmer?.stats}
						/>
					</Grid>
				</Container>
			</main>
		</div>
	)
}

export default App
