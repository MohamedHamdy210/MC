import movie from "../assets/movie.svg";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/${name}`);
    window.scrollTo(0, 0);
  };
  return (
    <header>
      <div
        onClick={() => {
          handleClick("");
        }}
        className="flex pointer"
      >
        <img src={movie} />
        <h1>MCDB</h1>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            handleClick("popular");
          }}
        >
          Popular
        </button>
        <button
          onClick={() => {
            handleClick("now playing");
          }}
        >
          Playing
        </button>
        <button
          onClick={() => {
            handleClick("top rated");
          }}
        >
          Top Rated
        </button>
      </div>
    </header>
  );
}
