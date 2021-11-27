import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat"

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

export default StatItem;