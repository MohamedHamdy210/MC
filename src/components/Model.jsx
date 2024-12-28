/* eslint-disable react/prop-types */
const Model = ({ model,setIsModelVisiable }) => {

  return (
    <div
      className="overlay"
      onClick={() => setIsModelVisiable((prev) => !prev)}
    >
      <div
        className="model"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${model.poster_path}`}
          alt="poster"
        />
        <div className="movieInfo">
          <button
            className="modal-close"
            onClick={() => setIsModelVisiable((prev) => !prev)}
          >
            ×
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default Model;
