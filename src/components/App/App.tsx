import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function handleSearch(title: string) {
    try {
      setIsError(false);
      setMovies([]);
      setIsLoading(true);
      const response = await fetchMovies(title);
      if (response.length === 0) {
        toast.error("No movies found for your request.")
        return;
      }
      setMovies(response);
     
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  function openModal(movie: Movie) {
    setIsModalOpen(true);
    setMovie(movie);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {isLoading && <Loader></Loader>}
      {isError && <ErrorMessage></ErrorMessage>}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isModalOpen && movie && (
        <MovieModal onClose={closeModal} movie={movie} />
      )}
    </div>
  );
}
