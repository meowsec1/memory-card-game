import '../styles/Card.css';

export default function Card({pokemonData}) {
    return (
        <div className="card">
            <img src={pokemonData.image}/>
            {pokemonData.name}
        </div>
    )
}