import { useState, useEffect } from "react";
import Cover from "./components/Cover";
import List from "./components/List";
import Page from "./components/Page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Model from "./components/Model";

function App() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isModelVisiable, setIsModelVisiable] = useState(false);
  const [model, setModel] = useState({});
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_APIK,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => setTopRated(res.results))
      .catch((err) => console.error(err));
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => setPopular(res.results));
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setNowPlaying(res.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (movie) => {
    setModel(movie);
    setIsModelVisiable((prev) => !prev);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Cover popular={popular} handleClick={handleClick} />
          {isModelVisiable && (
            <Model model={model} setIsModelVisiable={setIsModelVisiable} />
          )}
          <div className="lists">
            <List handleClick={handleClick} name="Popular" arr={[...popular]} />
            <List
              handleClick={handleClick}
              name="Now Playing"
              arr={[...nowPlaying]}
            />
            <List
              handleClick={handleClick}
              name="Top Rated"
              arr={[...topRated]}
            />
          </div>
        </>
      ),
    },
    {
      path: "/popular",
      element: (
        <>
          {isModelVisiable && (
            <Model model={model} setIsModelVisiable={setIsModelVisiable} />
          )}

          <Page arr={[...popular]} handleClick={handleClick} name={"Popular"} />
        </>
      ),
    },
    {
      path: "/Top Rated",
      element: (
        <>
          {isModelVisiable && (
            <Model model={model} setIsModelVisiable={setIsModelVisiable} />
          )}

          <Page
            arr={[...topRated]}
            name={"Top Rated"}
            handleClick={handleClick}
          />
        </>
      ),
    },
    {
      path: "/Now Playing",
      element: (
        <>
          {isModelVisiable && (
            <Model model={model} setIsModelVisiable={setIsModelVisiable} />
          )}
          <Page
            arr={[...nowPlaying]}
            name={"Now Playing"}
            handleClick={handleClick}
          />
        </>
      ),
    },
  ]);

  return loading ? <h1>Loading</h1> : <RouterProvider router={router} />;
}
export default App;
