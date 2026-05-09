import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb";

function MovieCard({ item, type = "movie" }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const link = type === "movie" ? `/filme/${item.id}` : `/serie/${item.id}`;
  const hasRating = Number.isFinite(item.vote_average);
  const rating = hasRating ? item.vote_average.toFixed(1) : "N/A";
  const ratingClass =
    item.vote_average >= 7
      ? "rating-good"
      : item.vote_average >= 5
        ? "rating-ok"
        : "rating-low";

  return (
    <Link to={link} className="movie-card">
      <div className="movie-poster">
        <img src={imageUrl(item.poster_path)} alt={title} />
        <span className="media-badge">{type === "movie" ? "Filme" : "Série"}</span>
      </div>

      <div className="movie-card-info">
        <h3>{title}</h3>

        <div className="movie-meta">
          <p>{date ? date.substring(0, 4) : "Sem data"}</p>
          <span className={`rating ${ratingClass}`}>{rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
