import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { imageUrl } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function TvDetails() {
  const { id } = useParams();

  const [series, setSeries] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTvDetails() {
      try {
        setError("");

        const [
          detailsResponse,
          creditsResponse,
          imagesResponse,
          recommendationsResponse,
        ] = await Promise.all([
          api.get(`/tv/${id}`, {
            params: { language: "pt-BR" },
          }),
          api.get(`/tv/${id}/credits`, {
            params: { language: "pt-BR" },
          }),
          api.get(`/tv/${id}/images`),
          api.get(`/tv/${id}/recommendations`, {
            params: { language: "pt-BR", page: 1 },
          }),
        ]);

        setSeries(detailsResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 12));
        setImages(imagesResponse.data.backdrops.slice(0, 8));
        setRecommendations(recommendationsResponse.data.results.slice(0, 8));
      } catch (error) {
        console.error("Erro ao carregar detalhes da série:", error);
        setError("Não foi possível carregar os detalhes da série.");
      }
    }

    loadTvDetails();
  }, [id]);

  if (error) {
    return (
      <main className="container">
        <p className="feedback feedback-error">{error}</p>
        <Link to="/" className="text-link">Voltar para início</Link>
      </main>
    );
  }

  if (!series) {
    return (
      <main className="container">
        <p className="feedback">Carregando detalhes da série...</p>
      </main>
    );
  }

  const firstYear = series.first_air_date
    ? series.first_air_date.substring(0, 4)
    : "Ano não informado";

  return (
    <main className="container">
      <Link to="/series" className="back-link">Voltar para séries</Link>

      <section className="details">
        <img
          className="poster"
          src={imageUrl(series.poster_path)}
          alt={series.name}
        />

        <div className="details-content">
          <span className="eyebrow">Série</span>
          <h1>{series.name}</h1>

          {series.tagline && <p className="tagline">{series.tagline}</p>}

          <div className="details-metrics">
            <span>Nota {series.vote_average?.toFixed(1) || "N/A"}</span>
            <span>{firstYear}</span>
            <span>{series.number_of_seasons || "N/A"} temporadas</span>
            <span>{series.status || "Status não informado"}</span>
          </div>

          <p>
            {series.overview ||
              "Esta série ainda não possui descrição em português."}
          </p>

          <p>
            <strong>Primeira exibição:</strong>{" "}
            {series.first_air_date || "Data não informada"}
          </p>

          <p>
            <strong>Última exibição:</strong>{" "}
            {series.last_air_date || "Data não informada"}
          </p>

          <p>
            <strong>Episódios:</strong> {series.number_of_episodes || "Não informado"}
          </p>

          <p>
            <strong>Gêneros:</strong>{" "}
            {series.genres?.length > 0
              ? series.genres.map((genre) => genre.name).join(", ")
              : "Gêneros não informados"}
          </p>
        </div>
      </section>

      <section>
        <h2>Temporadas</h2>

        {series.seasons?.length === 0 ? (
          <p className="feedback">Temporadas não disponíveis.</p>
        ) : (
          <div className="season-grid">
            {series.seasons?.map((season) => (
              <div key={season.id} className="season-card">
                <img
                  src={imageUrl(season.poster_path, "w342")}
                  alt={season.name}
                />

                <div>
                  <h3>{season.name}</h3>

                  <p>
                    <strong>Episódios:</strong> {season.episode_count}
                  </p>

                  <p>
                    <strong>Exibição:</strong> {season.air_date || "Data não informada"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
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
        <h2>Imagens da série</h2>

        {images.length === 0 ? (
          <p className="feedback">Imagens não disponíveis.</p>
        ) : (
          <div className="image-grid">
            {images.map((image) => (
              <img
                key={image.file_path}
                src={imageUrl(image.file_path, "w780")}
                alt="Imagem da série"
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
              <MovieCard key={item.id} item={item} type="tv" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default TvDetails;
