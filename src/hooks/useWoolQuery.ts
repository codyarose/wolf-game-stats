import { useQuery, UseQueryOptions } from "react-query"
import { WoolData } from "../types"

function useWoolQuery(options?: UseQueryOptions<WoolData>) {
	return useQuery<WoolData>(
		["wool"],
		() =>
			fetch(
				"https://api.coingecko.com/api/v3/coins/wolf-game-wool?market_data=false&community_data=false&developer_data=false&sparkline=false"
			).then((res) => res.json()),
		{
			refetchInterval: 10000,
			...options,
		}
	)
}

export default useWoolQuery
