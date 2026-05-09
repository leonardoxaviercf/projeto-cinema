import { useEffect, useState } from "react";
import api from "../api/tmdb";
import LoadingGrid from "../components/LoadingGrid";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "popular", label: "Populares", title: "Filmes populares" },
    { id: "now_playing", label: "Em cartaz", title: "Filmes em cartaz" },
    { id: "top_rated", label: "Mais bem avaliados", title: "Filmes mais bem avaliados" },
    { id: "upcoming", label: "Lançamentos", title: "Próximos lançamentos" },
  ];

  const currentCategory = categories.find((item) => item.id === category);

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
      <div className="page-heading">
        <span className="eyebrow">Catálogo</span>
        <h1>Filmes</h1>
      </div>

      <div className="filter-buttons" aria-label="Categorias de filmes">
        {categories.map((item) => (
          <button
            className={item.id === category ? "active" : ""}
            key={item.id}
            onClick={() => handleCategoryChange(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <h2>{currentCategory.title}</h2>

      {loading && <LoadingGrid />}

      {error && <p className="feedback feedback-error">{error}</p>}

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
              type="button"
            >
              Página anterior
            </button>

            <span>Página {page}</span>

            <button onClick={() => setPage((currentPage) => currentPage + 1)} type="button">
              Próxima página
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Movies;
