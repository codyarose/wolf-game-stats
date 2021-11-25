import { Box, Heading, Link } from "@chakra-ui/react"
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/stat"
import React from "react"
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
			href={`#`}
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

function StatItem({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) {
	return (
		<Stat flexBasis={["50%", "50%", "0%"]}>
			<StatLabel opacity='0.75'>{label}</StatLabel>
			<StatNumber fontSize='xl'>{children}</StatNumber>
		</Stat>
	)
}
