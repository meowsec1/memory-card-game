import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard'

import './App.css'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=12'


function App() {
  const [pokemonData, setPokemonData] = useState([])

useEffect(() => {
  async function fetchPokemonData(url) {
    // 1. Fetch list of Pokémon
    const response = await fetch(url);
    const data = await response.json();

    // 2. Fetch details for each Pokémon (to get images)
    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const imgResponse = await fetch(pokemon.url);
        const imgData = await imgResponse.json();
        return {
          name: pokemon.name,
          image: imgData.sprites.front_default
        };
      })
    );

    // 3. Store the array of Pokémon with images
    setPokemonData(detailedData);
  }

  fetchPokemonData(URL);
}, []);


  return (
    <>
      <GameBoard pokemonData={pokemonData}/>
    </>
  )
}

export default App
