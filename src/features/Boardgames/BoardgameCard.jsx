import { Link } from "react-router";

export function BoardgameCard({ game }) {
  return (
    <article>
      {/* .../boardgames/3/details */}
      <Link to={`${game.id}/details`}>
        <img src={game.thumbnail} alt={`Poster for ${game.name}`} />
        <h2>{game.name}</h2>
      </Link>
    </article>
  )
}
