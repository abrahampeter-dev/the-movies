import axios from "./axios";

export const getPopularMovies = async (page = 1) => {
  const res = await axios.get(`/movie/popular?page=${page}`);
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getTopRatedMovies = async (page = 1) => {
  const res = await axios.get("/movie/top_rated", { params: { page } });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getUpcomingMovies = async (page = 1) => {
  const res = await axios.get("/movie/upcoming", { params: { page } });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
    dates: res.data.dates,
  };
};

export const getSearchMovie = async (query, page = 1) => {
  const res = await axios.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getMovieDetails = async (id) => {
  const res = await Promise.allSettled([
    //
    axios.get(`/movie/${id}`),
    //
    axios.get(`/movie/${id}/credits`),
    //
    axios.get(`/movie/${id}/reviews`),
    //
    axios.get(`/movie/${id}/similar`),
    //
    axios.get(`/movie/${id}/videos`),
  ]);

  const [details, credits, reviews, similar, videos] = res;

  return {
    //
    ...(details.status === "fulfilled" ? details.value.data : {}),

    //
    cast: credits.status === "fulfilled" ? credits.value.data.cast : [],

    //
    reviews: reviews.status === "fulfilled" ? reviews.value.data.results : [],

    //
    similar: similar.status === "fulfilled" ? similar.value.data.results : [],

    //
    videos: videos.status === "fulfilled" ? videos.value.data.results : [],
  };
};
