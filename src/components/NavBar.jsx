import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        CineReact
      </NavLink>

      <nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/filmes">Filmes</NavLink>
        <NavLink to="/series">Séries</NavLink>
        <NavLink to="/buscar">Buscar</NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
