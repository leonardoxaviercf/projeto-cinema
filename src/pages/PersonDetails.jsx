import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { imageUrl } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function PersonDetails() {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPersonDetails() {
      try {
        setLoading(true);
        setError("");

        const [personResponse, creditsResponse, imagesResponse] =
          await Promise.all([
            api.get(`/person/${id}`, {
              params: { language: "pt-BR" },
            }),
            api.get(`/person/${id}/combined_credits`, {
              params: { language: "pt-BR" },
            }),
            api.get(`/person/${id}/images`),
          ]);

        setPerson(personResponse.data);

        const sortedCredits = creditsResponse.data.cast
          .filter((item) => item.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 18);

        setCredits(sortedCredits);
        setImages(imagesResponse.data.profiles.slice(0, 8));
      } catch (error) {
        console.error("Erro ao carregar detalhes da pessoa:", error);
        setError("Não foi possível carregar os detalhes da pessoa.");
      } finally {
        setLoading(false);
      }
    }

    loadPersonDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <p className="feedback">Carregando detalhes da pessoa...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <p className="feedback feedback-error">{error}</p>
        <Link to="/" className="text-link">Voltar para início</Link>
      </main>
    );
  }

  if (!person) {
    return (
      <main className="container">
        <p className="feedback">Pessoa não encontrada.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/" className="back-link">Voltar para início</Link>

      <section className="details">
        <img
          className="poster"
          src={imageUrl(person.profile_path, "w500")}
          alt={person.name}
        />

        <div className="details-content">
          <span className="eyebrow">Pessoa</span>
          <h1>{person.name}</h1>

          <p>
            {person.biography ||
              "Esta pessoa ainda não possui biografia em português."}
          </p>

          <div className="details-metrics">
            <span>{person.known_for_department || "Área não informada"}</span>
            <span>{person.birthday || "Nascimento não informado"}</span>
          </div>

          {person.deathday && (
            <p>
              <strong>Falecimento:</strong> {person.deathday}
            </p>
          )}

          <p>
            <strong>Local de nascimento:</strong>{" "}
            {person.place_of_birth || "Não informado"}
          </p>

          {person.homepage && (
            <p>
              <strong>Site oficial:</strong>{" "}
              <a href={person.homepage} target="_blank" rel="noreferrer" className="text-link">
                Acessar site
              </a>
            </p>
          )}
        </div>
      </section>

      <section>
        <h2>Participações conhecidas</h2>

        {credits.length === 0 ? (
          <p className="feedback">Nenhuma participação encontrada.</p>
        ) : (
          <div className="grid">
            {credits.map((item) => (
              <MovieCard
                key={`${item.media_type}-${item.id}`}
                item={item}
                type={item.media_type === "movie" ? "movie" : "tv"}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Fotos</h2>

        {images.length === 0 ? (
          <p className="feedback">Fotos não disponíveis.</p>
        ) : (
          <div className="person-images-grid">
            {images.map((image) => (
              <img
                key={image.file_path}
                src={imageUrl(image.file_path, "w342")}
                alt={`Foto de ${person.name}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default PersonDetails;
