import { useEffect, useState } from "react";
import api from "../api/tmdb";
import LoadingGrid from "../components/LoadingGrid";
import MovieCard from "../components/MovieCard";

function Series() {
  const [series, setSeries] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "popular", label: "Populares", title: "Séries populares" },
    { id: "airing_today", label: "Exibidas hoje", title: "Séries exibidas hoje" },
    { id: "on_the_air", label: "No ar", title: "Séries no ar" },
    { id: "top_rated", label: "Mais bem avaliadas", title: "Séries mais bem avaliadas" },
  ];

  const currentCategory = categories.find((item) => item.id === category);

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
      <div className="page-heading">
        <span className="eyebrow">Catálogo</span>
        <h1>Séries</h1>
      </div>

      <div className="filter-buttons" aria-label="Categorias de séries">
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
            {series.map((tv) => (
              <MovieCard key={tv.id} item={tv} type="tv" />
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

export default Series;
