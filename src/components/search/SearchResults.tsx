import React from "react";
import {
  MagnifyingGlassIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import type { Song } from "@/types";

interface SearchResultsProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  isLoading?: boolean;
}

export function SearchResults({
  songs,
  onSongSelect,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
          <span className="ml-3 text-gray-700">Buscando canciones...</span>
        </div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
        <div className="text-center py-8">
          <MagnifyingGlassIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No se encontraron canciones
          </h3>
          <p className="text-gray-600">
            Intenta con otros términos de búsqueda o ajusta los filtros
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Resultados ({songs.length})
        </h3>
        <div className="text-sm text-gray-600">
          Haz clic en una canción para verla
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {songs.map((song, index) => (
          <button
            key={`${song.title}-${index}`}
            onClick={() => onSongSelect(song)}
            className="w-full text-left p-4 rounded-lg bg-white/80 hover:bg-cyan-50 border border-gray-200 hover:border-cyan-300 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MusicalNoteIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {song.title}
                </h4>
                {song.author && (
                  <p className="text-sm text-gray-600">Por: {song.author}</p>
                )}
                {song.categories && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {/* Partes de la Misa */}
                    {song.categories.massParts?.slice(0, 2).map(part => (
                      <span
                        key={`mass-${part}`}
                        className="px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded-full border border-cyan-200"
                      >
                        🎵 {part}
                      </span>
                    ))}

                    {/* Tiempo Litúrgico */}
                    {song.categories.liturgicalSeasons
                      ?.slice(0, 1)
                      .map(season => (
                        <span
                          key={`season-${season}`}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                        >
                          ⏰ {season}
                        </span>
                      ))}

                    {/* Celebraciones Especiales */}
                    {song.categories.specialOccasions
                      ?.slice(0, 1)
                      .map(occasion => (
                        <span
                          key={`occasion-${occasion}`}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full border border-purple-200"
                        >
                          🎉 {occasion}
                        </span>
                      ))}

                    {/* Indicador de más categorías */}
                    {((song.categories.massParts?.length || 0) > 2 ||
                      (song.categories.liturgicalSeasons?.length || 0) > 1 ||
                      (song.categories.specialOccasions?.length || 0) > 1) && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                        +
                        {(song.categories.massParts?.length || 0) -
                          2 +
                          ((song.categories.liturgicalSeasons?.length || 0) -
                            1) +
                          ((song.categories.specialOccasions?.length || 0) -
                            1)}{" "}
                        más
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="text-gray-500 group-hover:text-cyan-600 transition-colors">
                →
              </div>
            </div>
          </button>
        ))}
      </div>

      {songs.length > 10 && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Mostrando {Math.min(songs.length, 10)} de {songs.length} canciones
          </p>
        </div>
      )}
    </div>
  );
}
