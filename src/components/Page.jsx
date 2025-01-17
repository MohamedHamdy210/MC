/* eslint-disable react/prop-types */
export default function Page({ arr, name, handleClick }) {
  const cardElements = arr.map((movie) => {
    return (
      <div key={movie.id} onClick={() => handleClick(movie)} className="PCard">
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt="poster"
        />
        <h5>{movie.title}</h5>
      </div>
    );
  });
  return (
    <>
      <div className="page">
        <h1>{name} Movies</h1>
        <div className="PList">{cardElements}</div>
      </div>
    </>
  );
}
