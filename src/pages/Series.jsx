import { useEffect, useState } from "react";
import api from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function Series() {
  const [series, setSeries] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const categoryTitles = {
    popular: "Séries populares",
    airing_today: "Séries exibidas hoje",
    on_the_air: "Séries no ar",
    top_rated: "Séries mais bem avaliadas",
  };

  useEffect(() => {
    async function loadSeries() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/tv/${category}`, {
          params: {
            language: "pt-BR",
            page,
          },
        });

        setSeries(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar séries:", error);
        setError("Não foi possível carregar as séries.");
      } finally {
        setLoading(false);
      }
    }

    loadSeries();
  }, [category, page]);

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    setPage(1);
  }

  return (
    <main className="container">
      <h1>Séries</h1>

      <div className="filter-buttons">
        <button onClick={() => handleCategoryChange("popular")}>
          Populares
        </button>

        <button onClick={() => handleCategoryChange("airing_today")}>
          Exibidas hoje
        </button>

        <button onClick={() => handleCategoryChange("on_the_air")}>
          No ar
        </button>

        <button onClick={() => handleCategoryChange("top_rated")}>
          Mais bem avaliadas
        </button>
      </div>

      <h2>{categoryTitles[category]}</h2>

      {loading && <p>Carregando séries...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid">
            {series.map((tv) => (
              <MovieCard key={tv.id} item={tv} type="tv" />
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

export default Series;