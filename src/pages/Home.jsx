import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { imageUrl } from "../api/tmdb";
import LoadingGrid from "../components/LoadingGrid";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [moviesResponse, seriesResponse] = await Promise.all([
          api.get("/movie/popular", {
            params: { language: "pt-BR", page: 1 },
          }),
          api.get("/tv/popular", {
            params: { language: "pt-BR", page: 1 },
          }),
        ]);

        setMovies(moviesResponse.data.results);
        setSeries(seriesResponse.data.results);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Não foi possível carregar os dados da TMDb.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const featured = movies[0];

  return (
    <main>
      <section
        className="home-hero"
        style={
          featured?.backdrop_path
            ? { "--hero-image": `url(${imageUrl(featured.backdrop_path, "original")})` }
            : undefined
        }
      >
        <div className="home-hero-content">
          <span className="eyebrow">Em destaque</span>
          <h1>{featured?.title || "Sistema de Filmes"}</h1>
          <p>
            {featured?.overview ||
              "Explore filmes e séries populares, veja detalhes do elenco e encontre novas recomendações."}
          </p>

          <div className="hero-actions">
            {featured && (
              <Link to={`/filme/${featured.id}`} className="primary-action">
                Ver detalhes
              </Link>
            )}
            <Link to="/buscar" className="secondary-action">
              Buscar catálogo
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {error && <p className="feedback feedback-error">{error}</p>}

        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Filmes</span>
              <h2>Populares agora</h2>
            </div>
            <Link to="/filmes">Ver todos</Link>
          </div>

          {loading ? (
            <LoadingGrid count={6} />
          ) : (
            <div className="grid">
              {movies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} item={movie} type="movie" />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Séries</span>
              <h2>Mais assistidas</h2>
            </div>
            <Link to="/series">Ver todas</Link>
          </div>

          {loading ? (
            <LoadingGrid count={6} />
          ) : (
            <div className="grid">
              {series.slice(0, 12).map((tv) => (
                <MovieCard key={tv.id} item={tv} type="tv" />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
