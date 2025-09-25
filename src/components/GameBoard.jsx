import Card from './Card'

import '../styles/GameBoard.css';

export default function GameBoard({pokemonData}) {
    console.log(pokemonData)
    return (
        <div className='game-board'>
        {pokemonData.map((pokemon) => {
            return (
                <Card key={pokemon.name} pokemonData={pokemon}/>
        )})}
        </div>
    )
}