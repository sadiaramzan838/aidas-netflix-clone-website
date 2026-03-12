import { useEffect, useState, useRef } from "react"
import { fetchMovieVideos } from "../api/tmdb"

function MovieModal({ movie, onClose }) {
  const [trailer, setTrailer] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!movie) return

    const loadTrailer = async () => {
      const videos = await fetchMovieVideos(movie.id)
      // Filter only YouTube trailers
      const youtubeTrailer = videos.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      )
      setTrailer(youtubeTrailer || null)
    }

    loadTrailer()

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
      // Stop trailer on close
      if (iframeRef.current) {
        iframeRef.current.src = ""
      }
    }
  }, [movie, onClose])

  if (!movie) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 flex gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-1/3 rounded-lg"
        />

        <div className="text-white flex-1 relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-2xl"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>

          <p className="text-gray-300 mb-4">{movie.overview}</p>

          {trailer ? (
            <div className="aspect-video">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-gray-400 mt-4">Trailer not available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieModal