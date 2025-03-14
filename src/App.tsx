import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import Search from "./components/Search";
import { Spinner } from "./components/Spinner";
import { useDebounce } from "react-use";
import useFetch from "./hooks/useFetch";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

interface IMovie {
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  original_language: string;
  id: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");

  useDebounce(() => setDebounceSearchTerm(searchTerm), 3000, [searchTerm]);

  const fetchMovies = (query: string): Promise<Response> => {
    const url = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    return fetch(url, options); // Return the fetch Promise
  };

  const { data, isLoading, errorMessage, fn } = useFetch<IMovie[]>(() => fetchMovies(debounceSearchTerm));

  useEffect(() => {
    fn();
  }, [debounceSearchTerm]);

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section>
        <h1>Movies</h1>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-700">{errorMessage}</p>
        ) : (
          <ul>
            {data?.map((movie: IMovie) => (
              <Card key={movie.id} movieData={movie} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default App;
