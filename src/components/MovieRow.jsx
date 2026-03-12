import { useEffect, useState, useRef } from "react";
import MovieModal from "./MovieModal";

function MovieRow({ title, fetchFunction, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const rowRef = useRef();

  // Load movies on mount
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchFunction();
      setMovies(data);
    };
    getMovies();
  }, [fetchFunction]);

  // Filter movies based on search query
 const filteredMovies = movies.filter(movie =>
  movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
);

  // Scroll left
  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  // Scroll right
  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 px-6 relative">
      <h2 id={title.toLowerCase().replace(/\s/g, "")} className="text-white text-2xl mb-3">
        {title}
      </h2>

      {/* LEFT SCROLL BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/1
        bg-black/70 hover:bg-black 
        text-white w-12 h-12 rounded-full 
        flex items-center justify-center 
        text-2xl transition duration-300 z-10"
      >
        ❮
      </button>

      {/* MOVIE ROW */}
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-hidden scrollbar-none"
      >
        {filteredMovies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onClick={() => setSelectedMovie(movie)}
            className="w-[150px] rounded-lg cursor-pointer transition duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
          />
        ))}
      </div>

      {/* RIGHT SCROLL BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/1
        bg-black/70 hover:bg-black 
        text-white w-12 h-12 rounded-full 
        flex items-center justify-center 
        text-2xl transition duration-300 z-10"
      >
        ❯
      </button>

      {/* MOVIE MODAL */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default MovieRow;