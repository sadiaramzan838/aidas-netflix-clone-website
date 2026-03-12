import { useEffect, useState } from "react"
import MovieModal from "./MovieModal"
import { FiPlay, FiInfo } from "react-icons/fi"
import { fetchTrendingMovies } from "../api/tmdb"

function HeroBanner() {
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchTrendingMovies()
      setMovies(data)
      setMovie(data[0])
    }

    loadMovies()
  }, [])

  useEffect(() => {
    if (!movies.length) return

    const interval = setInterval(() => {
      const random = movies[Math.floor(Math.random() * movies.length)]
      setMovie(random)
    }, 80000)

    return () => clearInterval(interval)
  }, [movies])

  if (!movie) return null

  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end p-10 relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="max-w-xl space-y-4 relative z-10">
        <h1 className="text-white text-4xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-200 text-sm line-clamp-3">{movie.overview}</p>

        {/* Buttons */}
       <div className="flex gap-4 mt-4">
  <button
    onClick={() => setSelectedMovie(movie)}
    className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
  >
    <FiPlay size={20} />
    Play
  </button>

  <button
    onClick={() => setSelectedMovie(movie)}
    className="flex items-center gap-2 bg-gray-700/70 text-white font-semibold px-6 py-2 rounded hover:bg-gray-600 transition"
  >
    <FiInfo size={20} />
    More Info
  </button>
</div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default HeroBanner