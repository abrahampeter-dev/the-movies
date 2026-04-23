const API_KEY = "85550b8625d321a11282fbb7b93f982c";
const BASE_URL = "https://api.themoviedb.org/3";

//
export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
