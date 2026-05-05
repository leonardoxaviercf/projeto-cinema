import { useEffect, useState } from "react";
import api from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
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
      }
    }

    loadData();
  }, []);

  return (
    <main className="container">
      <h1>Sistema de Filmes</h1>

      {error && <p>{error}</p>}

      <section>
        <h2>Filmes populares</h2>

        <div className="grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      <section>
        <h2>Séries populares</h2>

        <div className="grid">
          {series.map((tv) => (
            <MovieCard key={tv.id} item={tv} type="tv" />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;