import { Box, Heading, Link } from "@chakra-ui/react"
import { StatGroup } from "@chakra-ui/stat"
import StatItem from './StatItem';
import { Ticker } from "./types"

const EMPTY = "--"

type Props = {
	title: string
	stats?: Ticker
}

function TokenStatCard({ title, stats }: Props) {
	return (
		<Box
			as={Link}
			isExternal
			href='https://www.dextools.io/app/ether/pair-explorer/0x7b12d855445073987d45ea97b1af3554f05e4ef4'
			border='1px solid lightgray'
			borderRadius='lg'
			p='5'
			_hover={{
				textDecoration: "none",
			}}
		>
			<Heading size='md' pb='1'>
				{title}
			</Heading>
			<StatGroup gridRowGap='4'>
				<StatItem label='USD'>${stats?.converted_last.usd}</StatItem>
				<StatItem label='ETH'>{stats?.converted_last.eth}Ξ</StatItem>
			</StatGroup>
		</Box>
	)
}

export default TokenStatCard


