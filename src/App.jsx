import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import Login from "./components/Login";

import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchAnimationMovies,
  fetchDramaMovies,
  fetchRomanceMovies,
} from "./api/tmdb";

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Agar user login nahi hai to login page show karo
  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="bg-gray-900 min-h-screen">

      <Navbar
        user={user}
        setUser={setUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <HeroBanner />

      <MovieRow
        title="Trending"
        fetchFunction={fetchTrendingMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Popular"
        fetchFunction={fetchPopularMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Top Rated"
        fetchFunction={fetchTopRatedMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Upcoming"
        fetchFunction={fetchUpcomingMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Action Movies"
        fetchFunction={fetchActionMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Comedy Movies"
        fetchFunction={fetchComedyMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Horror Movies"
        fetchFunction={fetchHorrorMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Animation Movies"
        fetchFunction={fetchAnimationMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Drama Movies"
        fetchFunction={fetchDramaMovies}
        searchQuery={searchQuery}
      />

      <MovieRow
        title="Romance Movies"
        fetchFunction={fetchRomanceMovies}
        searchQuery={searchQuery}
      />

      <Footer />

    </div>
  );
}

export default App;