"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { SongCard } from "@/components/search/SongCard";
import { FunnelIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import baseSongs from "./songsChords";
import { transposeSong } from "./transpose";
import { STORAGE_KEYS, APP_CONFIG } from "@/lib/constants";
import type {
  Song,
  SearchFilters as SearchFiltersType,
  TransposedLyricLine,
} from "@/types";

export default function SearchPage() {
  // Estado principal
  const [query, setQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>(baseSongs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  // Estado de visualización
  const [showChords, setShowChords] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Estado de transposición
  const [transposeOffset, setTransposeOffset] = useState(0);
  const [useSpanishNotation, setUseSpanishNotation] = useState(true);
  const [transposedLyrics, setTransposedLyrics] = useState<
    TransposedLyricLine[] | null
  >(null);

  // Estado de filtros
  const [filters, setFilters] = useState<SearchFiltersType>({
    massParts: [],
    liturgicalSeasons: [],
    specialOccasions: [],
  });

  const wasUsingFilters = useRef(false);

  // Cargar canciones personalizadas
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SONGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSongs([...baseSongs, ...parsed]);
      }
    } catch (error) {
      console.error("Error loading custom songs:", error);
    }
  }, []);

  // Actualizar letras transponidas cuando cambia la canción seleccionada
  useEffect(() => {
    if (selectedSong) {
      const transposed = transposeSong(selectedSong.lyrics, transposeOffset);
      setTransposedLyrics(transposed);
    }
  }, [selectedSong, transposeOffset]);

  // Filtrar canciones
  useEffect(() => {
    setIsLoading(true);

    // Simular delay para mejor UX
    const timeoutId = setTimeout(() => {
      const filtered = songs.filter(song => {
        // Búsqueda por título
        const titleMatches =
          query.length < APP_CONFIG.searchMinLength ||
          song.title.toLowerCase().includes(query.toLowerCase());

        // Filtros de categorías
        const massMatch =
          filters.massParts.length === 0 ||
          filters.massParts.some(part =>
            song.categories?.massParts?.includes(part)
          );

        const seasonMatch =
          filters.liturgicalSeasons.length === 0 ||
          filters.liturgicalSeasons.some(season => {
            if (season === "Todos") {
              // Si se selecciona "Todos", incluir canciones que tengan cualquier tiempo litúrgico
              return (
                song.categories?.liturgicalSeasons &&
                song.categories.liturgicalSeasons.length > 0
              );
            } else {
              // Filtro normal para estaciones específicas
              return song.categories?.liturgicalSeasons?.includes(season);
            }
          });

        const specialOccasionMatch =
          filters.specialOccasions.length === 0 ||
          filters.specialOccasions.some(occasion =>
            song.categories?.specialOccasions?.includes(occasion)
          );

        return titleMatches && massMatch && seasonMatch && specialOccasionMatch;
      });

      setFilteredSongs(filtered.slice(0, APP_CONFIG.maxResults));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [songs, query, filters]);

  // Handlers
  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setTransposeOffset(0);
    setShowFilters(false);
    setIsMaximized(false);
  };

  const handleTranspose = (delta: number) => {
    setTransposeOffset(prev => prev + delta);
  };

  const handleToggleChords = () => {
    setShowChords(prev => !prev);
  };

  const handleNotationChange = () => {
    setUseSpanishNotation(prev => !prev);
  };

  const handleToggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const handleCloseSong = () => {
    setSelectedSong(null);
    setShowFilters(wasUsingFilters.current);
    setIsMaximized(false);
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
    wasUsingFilters.current = !showFilters;
  };

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSelectedSong(null);
    setTransposeOffset(0);
  };

  const showResults =
    query.length >= APP_CONFIG.searchMinLength ||
    (showFilters &&
      (filters.massParts.length > 0 ||
        filters.liturgicalSeasons.length > 0 ||
        filters.specialOccasions.length > 0));

  // Si está maximizada, mostrar solo la canción
  if (isMaximized && selectedSong) {
    return (
      <SongCard
        song={selectedSong}
        transposedLyrics={transposedLyrics}
        showChords={showChords}
        useSpanishNotation={useSpanishNotation}
        transposeOffset={transposeOffset}
        onToggleChords={handleToggleChords}
        onTranspose={handleTranspose}
        onNotationChange={handleNotationChange}
        onClose={handleCloseSong}
        isMaximized={isMaximized}
        onToggleMaximize={handleToggleMaximize}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 animate-gradient bg-[length:400%_400%]">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la página */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Buscar Canciones
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra canciones litúrgicas por título, parte de la misa,
              tiempo litúrgico o celebraciones especiales.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Búsqueda y filtros */}
            <div className="lg:col-span-1 space-y-6">
              {/* Barra de búsqueda */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  🔍 Buscar por título
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Escribe el nombre de la canción..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="text-lg"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleToggleFilters}
                      className="flex items-center gap-2"
                    >
                      <FunnelIcon className="w-4 h-4" />
                      {showFilters ? "Ocultar" : "Mostrar"} Filtros
                    </Button>
                    {query && (
                      <Button
                        variant="ghost"
                        onClick={handleClearSearch}
                        size="sm"
                      >
                        Limpiar
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Filtros */}
              {showFilters && (
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClose={() => setShowFilters(false)}
                />
              )}

              {/* Estadísticas */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-cyan-900 mb-4">
                  📊 Estadísticas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">Total de canciones:</span>
                    <span className="font-bold text-cyan-900">
                      {songs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">Resultados:</span>
                    <span className="font-bold text-cyan-900">
                      {filteredSongs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">Canciones personales:</span>
                    <span className="font-bold text-cyan-900">
                      {songs.length - baseSongs.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Información de ayuda */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  💡 Cómo buscar
                </h3>
                <ul className="space-y-3 text-blue-800 text-sm">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Escribe el título de la canción</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Usa los filtros para refinar la búsqueda</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Haz clic en una canción para verla</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Usa el botón maximizar para verla completa</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Panel derecho - Resultados y canción seleccionada */}
            <div className="lg:col-span-2">
              {selectedSong ? (
                <SongCard
                  song={selectedSong}
                  transposedLyrics={transposedLyrics}
                  showChords={showChords}
                  useSpanishNotation={useSpanishNotation}
                  transposeOffset={transposeOffset}
                  onToggleChords={handleToggleChords}
                  onTranspose={handleTranspose}
                  onNotationChange={handleNotationChange}
                  onClose={handleCloseSong}
                  onToggleMaximize={handleToggleMaximize}
                />
              ) : (
                <div className="space-y-6">
                  {/* Estado inicial */}
                  {!showResults && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
                      <MusicalNoteIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Busca tu canción
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Escribe el nombre de una canción o usa los filtros para
                        encontrar lo que necesitas.
                      </p>
                    </div>
                  )}

                  {/* Resultados */}
                  {showResults && (
                    <SearchResults
                      songs={filteredSongs}
                      onSongSelect={handleSongSelect}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
