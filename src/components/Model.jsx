import { useState } from "react";

/* eslint-disable react/prop-types */
const Model = ({ model, setIsModelVisiable, option }) => {
  const [video, setVideo] = useState(false);
  const [link, setLink] = useState("");
  fetch(
    `https://api.themoviedb.org/3/movie/${model.id}/videos?language=en-US`,
    option
  )
    .then((res) => res.json())
    .then((res) =>
      setLink(
        `https://www.youtube.com/embed/${
          res.results.find((vid) => vid.type === "Trailer").key
        }`
      )
    );
  const pos = `https://image.tmdb.org/t/p/w1280/${model.backdrop_path}`;
  const styles = {
    backgroundImage: `url(${pos})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const handleClick = () => {
    console.log(link);
    setVideo(true);
  };
  return (
    <div
      className="overlay"
      onClick={() => setIsModelVisiable((prev) => !prev)}
    >
      <div
        style={styles}
        className="model"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w780/${model.poster_path}`}
          alt="poster"
        />
        <button
          className="modal-close"
          onClick={() => setIsModelVisiable((prev) => !prev)}
        >
          ×
        </button>
      </div>
      {video && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="video"
        >
          <button
            className="video-close"
            onClick={() => setVideo((prev) => !prev)}
          >
            ×
          </button>
          <iframe
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share ;fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      )}
      <div
        className="movieInfo"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{model.title}</h2>
        <div className="rate">
          <h3>User Score: {model.vote_average.toFixed(2)}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: "#fbbf24", width: 35, marginLeft: 15 }}
            viewBox="0 0 24 24"
          >
            <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
          </svg>
        </div>

        <h4>Release Date: {model.release_date}</h4>
        <p>Overview: {model.overview}</p>
        <button onClick={handleClick}>Trailer</button>
      </div>
    </div>
  );
};

export default Model;
