import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard'

import './App.css'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=12'



function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [guesses, setGuesses] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)


  // Fetches pokemon data with images on mount
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


  function handleGuess(guess) {
    if (!guesses.includes(guess)) {
      setGuesses([...guesses, guess])
      setCurrentScore(currentScore+1)
    } else {
      setGuesses([])
      if (currentScore > highScore) {
        setHighScore(currentScore)
      }
      setCurrentScore(0)
    }
  }


  return (
    <>
      <div className='game-data-bar'>
        <h2>Current Score: {currentScore}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
      <GameBoard pokemonData={shuffleArray(pokemonData)} onClick={handleGuess}/>
    </>
  )
}

export default App
