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

//============ TV ===============//

//
export const getPopularTv = async (page = 1) => {
  const res = await axios.get("/tv/popular", { params: { page } });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getTopReatedTv = async (page = 1) => {
  const res = await axios.get("/tv/top_rated", { params: { page } });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getOnTheAirTv = async (page = 1) => {
  const res = await axios.get("/tv/on_the_air", { params: { page } });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getSearchTv = async (query, page = 1) => {
  const res = await axios.get("/search/tv", {
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
export const getTvDetails = async (id) => {
  const res = await Promise.allSettled([
    //
    axios.get(`/tv/${id}`),

    //
    axios.get(`/tv/${id}/credits`),

    //
    axios.get(`/tv/${id}/reviews`),

    //
    axios.get(`/tv/${id}/similar`),

    axios.get(`/tv/${id}/videos`),
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

//
export const getTvSeasonDetails = async (series_id, season_number) => {
  const res = await axios.get(`/tv/${series_id}/season/${season_number}`);
  return res.data;
};

//
export const getTvEpisodeDetails = async (
  series_id,
  season_number,
  episode_number,
) => {
  const res = await axios.get(
    `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
  );
  return res.data;
};

//============ Trending ===============//

export const getAllTrending = async (timeWindow, page = 1) => {
  const res = await axios.get(`/trending/all/${timeWindow}`, {
    params: { page },
  });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//============ Trending ===============//

export const getAllArtists = async (page = 1) => {
  const res = await axios.get("/person/popular", {
    params: { page },
  });

  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getSearchArtist = async (query, page = 1) => {
  const res = await axios.get("/search/person", {
    params: { query, page },
  });
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
  };
};

//
export const getArtistDetails = async (id) => {
  const res = await Promise.allSettled([
    //
    axios.get(`/person/${id}`),

    //
    axios.get(`/person/${id}/combined_credits`),
  ]);

  const [details, credits] = res;

  return {
    //
    ...(details.status === "fulfilled" ? details.value.data : {}),

    //
    cast: credits.status === "fulfilled" ? credits.value.data.cast : [],
  };
};
