import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { imageUrl } from "../api/tmdb";

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
        <p>Carregando detalhes da pessoa...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <p>{error}</p>
        <Link to="/">Voltar para início</Link>
      </main>
    );
  }

  if (!person) {
    return (
      <main className="container">
        <p>Pessoa não encontrada.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="details">
        <img
          className="poster"
          src={imageUrl(person.profile_path, "w500")}
          alt={person.name}
        />

        <div>
          <h1>{person.name}</h1>

          <p>
            {person.biography ||
              "Esta pessoa ainda não possui biografia em português."}
          </p>

          <p>
            <strong>Conhecido por:</strong>{" "}
            {person.known_for_department || "Não informado"}
          </p>

          <p>
            <strong>Nascimento:</strong>{" "}
            {person.birthday || "Data não informada"}
          </p>

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
              <a href={person.homepage} target="_blank" rel="noreferrer">
                Acessar site
              </a>
            </p>
          )}
        </div>
      </section>

      <section>
        <h2>Participações conhecidas</h2>

        {credits.length === 0 ? (
          <p>Nenhuma participação encontrada.</p>
        ) : (
          <div className="grid">
            {credits.map((item) => {
              const title = item.title || item.name;
              const date = item.release_date || item.first_air_date;

              const link =
                item.media_type === "movie"
                  ? `/filme/${item.id}`
                  : `/serie/${item.id}`;

              return (
                <Link
                  key={`${item.media_type}-${item.id}`}
                  to={link}
                  className="movie-card"
                >
                  <img src={imageUrl(item.poster_path)} alt={title} />

                  <div className="movie-card-info">
                    <h3>{title}</h3>

                    <p>
                      {date ? date.substring(0, 4) : "Sem data"}
                    </p>

                    <p>
                      {item.media_type === "movie" ? "Filme" : "Série"}
                    </p>

                    <p>
                      {item.character
                        ? `Personagem: ${item.character}`
                        : "Participação não informada"}
                    </p>

                    <span>⭐ {item.vote_average?.toFixed(1)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2>Fotos</h2>

        {images.length === 0 ? (
          <p>Fotos não disponíveis.</p>
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