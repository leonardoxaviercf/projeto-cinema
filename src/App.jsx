import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
        <Route path="/filmes" element={<Movies />} />
        <Route path="/series" element={<Series />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;