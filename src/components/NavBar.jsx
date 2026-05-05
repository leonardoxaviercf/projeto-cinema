import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        CineReact
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/filmes">Filmes</Link>
        <Link to="/series">Séries</Link>
        <Link to="/buscar">Buscar</Link>
      </nav>
    </header>
  );
}

export default NavBar;