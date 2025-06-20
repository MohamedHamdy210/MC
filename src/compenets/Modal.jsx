import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
 const movieCache={}
const Modal = ({ closeModal, movieId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideo, setMovieVideo] = useState("");
  const fetchMovieDetails = async (movieId) => {
    if(movieCache?.id==movieId){
      setMovieDetails(movieCache.movieDetails);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}?language=en-US`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message || "Failed to fetch movie details");
      }
      movieCache.id = movieId;
      movieCache.movieDetails=data;
      setMovieDetails(data || {});
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setErrorMessage("Failed to fetch movie details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMovieVideo = async (movieId) => {
    if (movieCache?.id == movieId) {
      setMovieVideo(movieCache.movieVideo);
      return;
    }
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}/videos?language=en-US`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message || "Failed to fetch movie video");
      }
      const video = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (video) {
        movieCache.movieVideo = `https://www.youtube.com/embed/${video.key}`;
        setMovieVideo(`https://www.youtube.com/embed/${video.key}`);
      } else {
        setMovieVideo("");
      }
    } catch (error) {
      console.error("Error fetching movie video:", error);
      setErrorMessage("Failed to fetch movie video. Please try again later.");
    }
  };
  useEffect(() => {
    fetchMovieDetails(movieId);
    fetchMovieVideo(movieId);
    // return () => {
    //   second
    // }
  }, []);

  return isLoading ? (
    <Spinner />
  ) : errorMessage ? (
    <p className="text-red-500">{errorMessage}</p>
  ) : (
    <div
      className="modal-layer"
      onClick={() => {
        closeModal();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal bg-dark-100 p-5 rounded-lg"
      >
        <div className="flex justify-end">
          <button
            onClick={() => {
              closeModal();
            }}
            className=" text-white text-2xl bg-gray-600 rounded-lg px-2 py-1"
          >
            X
          </button>
        </div>
        <div className="flex text-white justify-between my-3 ">
          <h2>{movieDetails.original_title}</h2>
          <div className="flex flex-row items-center gap-1 mr-5">
            <img src="star.svg" alt="star icon" />
            <p>
              {movieDetails.vote_average
                ? movieDetails.vote_average.toFixed(1)
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-3 items-center">
          {" "}
          <p className="text-gray-100 font-medium text-base">
            {movieDetails.release_date
              ? movieDetails.release_date.split("-")[0]
              : "N/A"}
          </p>
          <span className="text-sm text-gray-100">•</span>
          <p className="capitalize text-gray-100 font-medium text-base">
            {movieDetails.original_language}
          </p>
          <span className="text-sm text-gray-100">•</span>
          <p className="capitalize text-gray-100 font-medium text-base">
            {`${parseInt(movieDetails.runtime / 60)}h ${
              movieDetails.runtime % 60
            }m`}
          </p>
        </div>
        <div className="movie-details-row flex items-center w-full gap-6 ">
          <img
            className="h-[400px] object-contain rounded-lg"
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : `no-movie.png`
            }
            alt={movieDetails.original_title}
          />
          {movieVideo && (
            <iframe
              className=" w-full h-[400px]  rounded-lg"
              src={movieVideo}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="modal-content mt-6 flex justify-between text-white">
          <div className="movie-details flex  flex-col w-3/4 gap-6">
            <div className="movie-details-row">
              <div className="flex-1/5 text-gray-100">Generes</div>
              <div className="flex-4/5 flex gap-3 flex-wrap">
                {movieDetails.genres?.map((genre) => (
                  <span className=" bg-gray-600  p-2 rounded-lg">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="movie-details-row   ">
              <div className="flex-1/5 text-gray-100">Overview</div>
              <div className="flex-4/5 max-w-4/5">{movieDetails.overview}</div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Release Date</div>
              <div className="flex-4/5">{movieDetails.release_date}</div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Countries</div>
              <div className="flex-4/5">
                {movieDetails.production_countries?.map((c) => (
                  <span className="spreators"> {c.name} </span>
                ))}
              </div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Language</div>
              <div className="flex-4/5">
                {movieDetails.spoken_languages?.map((l) => (
                  <span className="spreators"> {l.name} </span>
                ))}
              </div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Budget</div>
              <div className="flex-4/5">{`$${(
                movieDetails.budget / 1000000
              ).toFixed(1)} Million`}</div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Revenue</div>
              <div className="flex-4/5">{`$${(
                movieDetails.revenue / 1000000
              ).toFixed(1)} Million`}</div>
            </div>
            <div className="movie-details-row ">
              <div className="flex-1/5 text-gray-100">Production Companies</div>
              <div className="flex-4/5">
                {movieDetails.production_companies?.map((c) => (
                  <span className="spreators"> {c.name} </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <a href={movieDetails.homepage} target="_blank">
              <button
                className={` page-button   ${
                  movieDetails.homepage
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                disabled={!movieDetails.homepage}
              >
                Visit Homepage
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
