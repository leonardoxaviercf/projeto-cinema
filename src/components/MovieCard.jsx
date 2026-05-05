import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb";

function MovieCard({ item, type = "movie" }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const link = type === "movie" ? `/filme/${item.id}` : `/serie/${item.id}`;

  return (
    <Link to={link} className="movie-card">
      <img src={imageUrl(item.poster_path)} alt={title} />

      <div className="movie-card-info">
        <h3>{title}</h3>
        <p>{date ? date.substring(0, 4) : "Sem data"}</p>
        <span>⭐ {item.vote_average?.toFixed(1)}</span>
      </div>
    </Link>
  );
}

export default MovieCard;