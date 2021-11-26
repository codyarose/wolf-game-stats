import { useQuery, UseQueryOptions } from "react-query"
import { CollectionStats } from "../types"

function useStatsQuery(
	collection: string,
	options?: UseQueryOptions<{ stats: CollectionStats }>
) {
	return useQuery<{ stats: CollectionStats }>(
		[collection],
		() =>
			fetch(
				`https://api.opensea.io/api/v1/collection/${collection}/stats`
			).then((res) => res.json()),
		{
			refetchInterval: 60000,
			...options,
		}
	)
}

export default useStatsQuery
