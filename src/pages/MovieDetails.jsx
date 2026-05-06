import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { imageUrl } from "../api/tmdb";

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
        <p>{error}</p>
        <Link to="/">Voltar para início</Link>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="container">
        <p>Carregando detalhes do filme...</p>
      </main>
    );
  }

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "Ano não informado";

  const runtime = movie.runtime
    ? `${movie.runtime} minutos`
    : "Duração não informada";

  return (
    <main className="container">
      <section className="details">
        <img
          className="poster"
          src={imageUrl(movie.poster_path)}
          alt={movie.title}
        />

        <div>
          <h1>{movie.title}</h1>

          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

          <p>
            {movie.overview ||
              "Este filme ainda não possui descrição em português."}
          </p>

          <p>
            <strong>Nota:</strong> {movie.vote_average?.toFixed(1)}
          </p>

          <p>
            <strong>Ano:</strong> {releaseYear}
          </p>

          <p>
            <strong>Duração:</strong> {runtime}
          </p>

          <p>
            <strong>Lançamento:</strong>{" "}
            {movie.release_date || "Data não informada"}
          </p>

          <p>
            <strong>Gêneros:</strong>{" "}
            {movie.genres?.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Gêneros não informados"}
          </p>

          <p>
            <strong>Status:</strong> {movie.status || "Não informado"}
          </p>
        </div>
      </section>

      <section>
        <h2>Elenco principal</h2>

        {cast.length === 0 ? (
          <p>Elenco não disponível.</p>
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
          <p>Imagens não disponíveis.</p>
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
          <p>Não há recomendações disponíveis.</p>
        ) : (
          <div className="grid">
            {recommendations.map((item) => (
              <Link key={item.id} to={`/filme/${item.id}`} className="movie-card">
                <img src={imageUrl(item.poster_path)} alt={item.title} />

                <div className="movie-card-info">
                  <h3>{item.title}</h3>
                  <p>
                    {item.release_date
                      ? item.release_date.substring(0, 4)
                      : "Sem data"}
                  </p>
                  <span>⭐ {item.vote_average?.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MovieDetails;