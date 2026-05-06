import { useEffect, useState } from "react";
import api from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const categoryTitles = {
    popular: "Filmes populares",
    now_playing: "Filmes em cartaz",
    top_rated: "Filmes mais bem avaliados",
    upcoming: "Próximos lançamentos",
  };

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/movie/${category}`, {
          params: {
            language: "pt-BR",
            page,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
        setError("Não foi possível carregar os filmes.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [category, page]);

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    setPage(1);
  }

  return (
    <main className="container">
      <h1>Filmes</h1>

      <div className="filter-buttons">
        <button onClick={() => handleCategoryChange("popular")}>
          Populares
        </button>

        <button onClick={() => handleCategoryChange("now_playing")}>
          Em cartaz
        </button>

        <button onClick={() => handleCategoryChange("top_rated")}>
          Mais bem avaliados
        </button>

        <button onClick={() => handleCategoryChange("upcoming")}>
          Lançamentos
        </button>
      </div>

      <h2>{categoryTitles[category]}</h2>

      {loading && <p>Carregando filmes...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Página anterior
            </button>

            <span>Página {page}</span>

            <button onClick={() => setPage((currentPage) => currentPage + 1)}>
              Próxima página
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Movies;