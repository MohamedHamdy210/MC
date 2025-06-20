import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "./compenets/Search";
import Spinner from "./compenets/Spinner";
import MovieCard from "./compenets/MovieCard";
import Modal from "./compenets/Modal";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [modal, setModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [movieDetails, setMovieDetails] = useState(null);
  // const [movieVideo, setMovieVideo] = useState("");
  const [page, setPage] = useState(0);

  useDebounce(() => {setDebouncedSearchTerm(searchTerm)
    setPage(0)
  }, 500, [searchTerm]);
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&sort_by=popularity.desc&page=${page + 1}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${
            page + 1
          }&include_adult=false`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message || "Failed to fetch movies");
      }
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchTrendingMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/trending/all/week?language=en-US'`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message || "Failed to fetch movies");
      }
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setTrendingMovies([]);
        return;
      }
      setTrendingMovies(data.results.slice(0, 10) || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm ,page]);
  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  
  const handleClick = (movie) => {
    setModal(movie.id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main>
      {isModalOpen && <Modal movieId={modal} closeModal={closeModal} />}
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero" className="hero" />
          <h1>
            Fine <span className="text-gradient">Movies</span> You'll Enjoy
            Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <div className="scrolling">
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li
                    onClick={() => {
                      handleClick(movie);
                    }}
                    key={movie.id}
                  >
                    <p>{index + 1}</p>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                          : `no-movie.png`
                      }
                      alt=""
                    />
                  </li>
                ))}
              </ul>
              <ul aria-hidden="true">
                {trendingMovies.map((movie, index) => (
                  <li
                    onClick={() => {
                      handleClick(movie);
                    }}
                    key={movie.id}
                  >
                    <p>{index + 1}</p>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                          : `no-movie.png`
                      }
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <section className="all-movies ">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard
                  handleClick={handleClick}
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </ul>
          )}
          <div className="flex justify-between items-center text-white p-2">
            <button
              className="arrow"
              onClick={() => {
                if (page > 0) {
                  setPage((prev) => prev - 1);
                }
              }}
            >
              <img className="" src="./left.svg" alt="" />
            </button>
            <span>
              {page + 1}
              <span className="text-gray-100"> / 50</span>
            </span>
            <button
              className=" arrow  "
              onClick={() => {
                if (page < 49) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              <img className="" src="./right.svg" alt="" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
