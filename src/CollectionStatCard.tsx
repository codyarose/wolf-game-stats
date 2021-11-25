import { Box, Heading, Link } from "@chakra-ui/react"
import {
	Stat,
	StatArrow,
	StatGroup,
	StatLabel,
	StatNumber,
} from "@chakra-ui/stat"
import React from "react"
import { CollectionStats } from "./types"

const EMPTY = "--"

type Props = {
	title: string
	collection: string
	stats?: CollectionStats
}

function CollectionStatCard({ title, collection, stats }: Props) {
	return (
		<Box
			as={Link}
			isExternal
			href={`https://opensea.io/collection/${collection}`}
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
				<StatItem label='Floor'>
					{`${formatNumber(stats?.floor_price)}Ξ` || EMPTY}
				</StatItem>

				<StatItem label='Daily Change'>
					{stats?.one_day_change ? (
						<>
							<StatArrow
								type={
									stats.one_day_change > 0
										? "increase"
										: "decrease"
								}
							/>
							{formatNumber(stats.one_day_change)}%
						</>
					) : (
						EMPTY
					)}
				</StatItem>

				<StatItem label='Daily Sales'>
					{stats?.one_day_sales || EMPTY}
				</StatItem>

				<StatItem label='Daily Volume'>
					{`${formatNumber(stats?.one_day_volume, 1)}Ξ` || EMPTY}
				</StatItem>
			</StatGroup>
		</Box>
	)
}

export default CollectionStatCard

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

const formatNumber = (num?: number, fixed: number = 3) =>
	Number(num?.toFixed(fixed))
