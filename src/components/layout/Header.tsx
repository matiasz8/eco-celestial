import Link from "next/link";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function Header() {
  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MusicalNoteIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Eco Celestial</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
            >
              Buscar
            </Link>
            <Link
              href="/add"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
            >
              Agregar
            </Link>
            <Link
              href="/lyrics"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium"
            >
              Letras
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-cyan-600 transition-colors"
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/search"
              className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Buscar
            </Link>
            <Link
              href="/add"
              className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Agregar
            </Link>
            <Link
              href="/lyrics"
              className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
            >
              Letras
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
