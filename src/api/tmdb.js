const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

// --- Movie fetch functions ---
export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export const fetchUpcomingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

// --- Genre-specific fetch functions ---
export const fetchActionMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
  const data = await res.json()
  return data.results
}

export const fetchComedyMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`)
  const data = await res.json()
  return data.results
}

export const fetchHorrorMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`)
  const data = await res.json()
  return data.results
}

export const fetchAnimationMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`)
  const data = await res.json()
  return data.results
}

export const fetchDramaMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18`)
  const data = await res.json()
  return data.results
}

export const fetchRomanceMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`)
  const data = await res.json()
  return data.results
}

// --- Trailer fetch function with Hindi fallback ---
export const fetchMovieVideos = async (movieId) => {
  let res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=hi-IN`)
  let data = await res.json()
  let videos = data.results

  if (!videos || videos.length === 0) {
    res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
    data = await res.json()
    videos = data.results
  }

  return videos
}