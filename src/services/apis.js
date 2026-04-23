import axios from "./axios";

export const getPopularMovies = async (page = 1) => {
  const res = await axios.get(`/movie/popular?page=${page}`);
  console.log("heelo", res.data.results);
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
// export const getMovieDetails = async () => {
// const res  =await
// }
