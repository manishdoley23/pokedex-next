import { useQuery } from "@tanstack/react-query";
import { getEvolutionChain, getPokemonById } from "../api/pokemon";

export function usePokemonDetail(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
  });
}

export function useEvolutionChain(pokemonId: number) {
  return useQuery({
    queryKey: ["evolution", pokemonId],
    queryFn: () => getEvolutionChain(pokemonId),
  });
}

// export function useEvolutionChain(speciesUrl: string) {
//   const [data, setData] = React.useState<EvolutionChain | null>(null);
//   const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     async function fetchEvolutionChain() {
//       try {
//         // First, fetch the species data to get the evolution chain URL
//         const speciesResponse = await fetch(speciesUrl);
//         const speciesData = await speciesResponse.json();

//         // Extract the evolution chain ID from the URL
//         const evolutionUrl = speciesData.evolution_chain.url;
//         const evolutionId = evolutionUrl.split("/").slice(-2, -1)[0];

//         // Fetch the evolution chain data
//         const evolutionData = await getEvolutionChain(evolutionId);
//         setData(evolutionData);
//       } catch (error) {
//         console.error("Error fetching evolution chain:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (speciesUrl) {
//       fetchEvolutionChain();
//     }
//   }, [speciesUrl]);

//   return { data, isLoading };
// }
