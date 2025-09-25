import '../styles/Card.css';

export default function Card({ pokemonData, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={pokemonData.image}/>
            {pokemonData.name}
        </div>
    )
}