/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import arrow from "../assets/arrow.svg";
export default function List({ arr, name, handleClick }) {
  const navigate = useNavigate();
  const cardElements = arr.map((movie, index) => {
    if (index > 5) {
      return;
    }
    return (
      <div key={movie.id} onClick={() => handleClick(movie)} className="lCard">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="poster"
        />
        <h5>{movie.title}</h5>
      </div>
    );
  });
  const arrowClick = () => {
    navigate(`/${name}`);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <h1>{name} Movies</h1>
      <div className="List">
        {cardElements}
        <img onClick={arrowClick} src={arrow} alt="view more" />
      </div>
    </>
  );
}
