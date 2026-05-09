import { useState } from "react";
import api from "../api/tmdb";
import LoadingGrid from "../components/LoadingGrid";
import MovieCard from "../components/MovieCard";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Digite algo para buscar.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const response = await api.get("/search/multi", {
        params: {
          query,
          language: "pt-BR",
          page: 1,
        },
      });

      const filteredResults = response.data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      setResults(filteredResults);
    } catch (error) {
      console.error("Erro ao buscar:", error);
      setError("Não foi possível realizar a busca.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="page-heading">
        <span className="eyebrow">Descoberta</span>
        <h1>Buscar</h1>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Digite o nome de um filme ou série"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      {loading && <LoadingGrid count={8} />}

      {error && <p className="feedback feedback-error">{error}</p>}

      {!loading && searched && results.length === 0 && !error && (
        <p className="feedback">Nenhum resultado encontrado.</p>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="section-header">
            <div>
              <span className="eyebrow">{results.length} resultados</span>
              <h2>Resultados encontrados</h2>
            </div>
          </div>

          <div className="grid">
            {results.map((item) => (
              <MovieCard
                key={`${item.media_type}-${item.id}`}
                item={item}
                type={item.media_type === "movie" ? "movie" : "tv"}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Search;
