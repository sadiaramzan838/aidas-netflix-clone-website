import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

function Navbar({ searchQuery, setSearchQuery, user, setUser }) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-red-600 font-bold text-4xl cursor-pointer">
          AIDAS
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white font-semibold mr-auto pl-6">
          <a href="#trending" className="hover:text-red-600 transition">Trending</a>
          <a href="#popular" className="hover:text-red-600 transition">Popular</a>
          <a href="#toprated" className="hover:text-red-600 transition">Top Rated</a>
          <a href="#upcoming" className="hover:text-red-600 transition">Upcoming</a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition w-64"
            />
          </div>

          {/* Mobile Search */}
          <div className="md:hidden flex items-center">

            {searchOpen ? (
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 rounded bg-gray-800 text-white outline-none w-40"
              />
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                <FiSearch className="text-white text-xl" />
              </button>
            )}

          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 text-white">

            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold">
              {user?.charAt(0).toUpperCase()}
            </div>

            <span className="hidden md:block">{user}</span>

            <button
              onClick={logout}
className="text-red-600 ml-8 text-xl font-bold hover:text-red-400 transition"            >
              Logout
            </button>

          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md flex flex-col space-y-4 px-6 py-4 text-white font-semibold">
          <a href="#trending" className="hover:text-red-600 transition">Trending</a>
          <a href="#popular" className="hover:text-red-600 transition">Popular</a>
          <a href="#toprated" className="hover:text-red-600 transition">Top Rated</a>
          <a href="#upcoming" className="hover:text-red-600 transition">Upcoming</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;