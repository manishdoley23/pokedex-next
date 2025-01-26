import PokedexContainer from "../pokedex/pokedex-container";
import { CompareProvider } from "../providers/compare-pokemon-provider";
import { ComparePokemonView } from "./compare-pokemon-view";

export default function ComparePokemon() {
  return (
    <CompareProvider max={6}>
      <div>
        <h1 className="text-4xl text-center font-bold mb-8">Compare Pokemon</h1>
        <ComparePokemonView />
        <div className="mt-8">
          <PokedexContainer mode="compare" />
        </div>
      </div>
    </CompareProvider>
  );
}
