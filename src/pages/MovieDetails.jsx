import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { imageUrl } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setError("");

        const [
          detailsResponse,
          creditsResponse,
          imagesResponse,
          recommendationsResponse,
        ] = await Promise.all([
          api.get(`/movie/${id}`, {
            params: { language: "pt-BR" },
          }),
          api.get(`/movie/${id}/credits`, {
            params: { language: "pt-BR" },
          }),
          api.get(`/movie/${id}/images`),
          api.get(`/movie/${id}/recommendations`, {
            params: { language: "pt-BR", page: 1 },
          }),
        ]);

        setMovie(detailsResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 12));
        setImages(imagesResponse.data.backdrops.slice(0, 8));
        setRecommendations(recommendationsResponse.data.results.slice(0, 8));
      } catch (error) {
        console.error("Erro ao carregar detalhes do filme:", error);
        setError("Não foi possível carregar os detalhes do filme.");
      }
    }

    loadMovieDetails();
  }, [id]);

  if (error) {
    return (
      <main className="container">
        <p className="feedback feedback-error">{error}</p>
        <Link to="/" className="text-link">Voltar para início</Link>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="container">
        <p className="feedback">Carregando detalhes do filme...</p>
      </main>
    );
  }

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "Ano não informado";

  const runtime = movie.runtime ? `${movie.runtime} minutos` : "Duração não informada";

  return (
    <main className="container">
      <Link to="/filmes" className="back-link">Voltar para filmes</Link>

      <section className="details">
        <img
          className="poster"
          src={imageUrl(movie.poster_path)}
          alt={movie.title}
        />

        <div className="details-content">
          <span className="eyebrow">Filme</span>
          <h1>{movie.title}</h1>

          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

          <div className="details-metrics">
            <span>Nota {movie.vote_average?.toFixed(1) || "N/A"}</span>
            <span>{releaseYear}</span>
            <span>{runtime}</span>
            <span>{movie.status || "Status não informado"}</span>
          </div>

          <p>
            {movie.overview ||
              "Este filme ainda não possui descrição em português."}
          </p>

          <p>
            <strong>Lançamento:</strong> {movie.release_date || "Data não informada"}
          </p>

          <p>
            <strong>Gêneros:</strong>{" "}
            {movie.genres?.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Gêneros não informados"}
          </p>
        </div>
      </section>

      <section>
        <h2>Elenco principal</h2>

        {cast.length === 0 ? (
          <p className="feedback">Elenco não disponível.</p>
        ) : (
          <div className="cast-grid">
            {cast.map((person) => (
              <Link
                key={person.id}
                to={`/pessoa/${person.id}`}
                className="cast-card"
              >
                <img
                  src={imageUrl(person.profile_path, "w185")}
                  alt={person.name}
                />

                <h3>{person.name}</h3>
                <p>{person.character || "Personagem não informado"}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Imagens do filme</h2>

        {images.length === 0 ? (
          <p className="feedback">Imagens não disponíveis.</p>
        ) : (
          <div className="image-grid">
            {images.map((image) => (
              <img
                key={image.file_path}
                src={imageUrl(image.file_path, "w780")}
                alt="Imagem do filme"
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Recomendações</h2>

        {recommendations.length === 0 ? (
          <p className="feedback">Não há recomendações disponíveis.</p>
        ) : (
          <div className="grid">
            {recommendations.map((item) => (
              <MovieCard key={item.id} item={item} type="movie" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MovieDetails;
