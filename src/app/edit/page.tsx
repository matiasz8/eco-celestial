"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  MusicalNoteIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  liturgicalTime: string;
  key: string;
  tempo: number;
  lastModified: string;
  lyrics?: string;
}

export default function EditPage() {
  const [isClient, setIsClient] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [viewingLyrics, setViewingLyrics] = useState<Song | null>(null);

  const categories = [
    "all",
    "Canto",
    "Aclamación",
    "Gloria",
    "Santo",
    "Ofertorio",
    "Comunión",
  ];
  const liturgicalTimes = [
    "all",
    "Domingo",
    "Pascua",
    "Navidad",
    "Eucaristía",
    "Adviento",
  ];

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredSongs = songs.filter(song => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || song.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (song: Song) => {
    setEditingSong(song);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta canción?")) {
      setSongs(songs.filter(song => song.id !== id));
    }
  };

  const handleSave = (updatedSong: Song) => {
    setSongs(
      songs.map(song =>
        song.id === updatedSong.id
          ? {
              ...updatedSong,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : song
      )
    );
    setEditingSong(null);
  };

  const handleCancel = () => {
    setEditingSong(null);
  };

  const handleViewLyrics = (song: Song) => {
    setViewingLyrics(song);
  };

  // Renderizar un estado de carga mientras se hidrata
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <PencilIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Editar Canciones
              </h1>
              <p className="text-gray-600">
                Gestiona y modifica tu biblioteca de canciones litúrgicas
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar canciones..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "Todas las categorías" : category}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusIcon className="w-5 h-5 mr-2" />
              Nueva Canción
            </button>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          {filteredSongs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MusicalNoteIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay canciones para modificar
              </h3>
              <p className="text-gray-600 mb-6">
                Aún no has agregado canciones a tu biblioteca personal. Usa el
                botón &quot;Nueva Canción&quot; para comenzar a agregar tus
                canciones.
              </p>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <PlusIcon className="w-5 h-5 mr-2" />
                Agregar Primera Canción
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Título
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Artista
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Categoría
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tiempo Litúrgico
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tonalidad
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tempo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Última Modificación
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredSongs.map(song => (
                    <tr
                      key={song.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <MusicalNoteIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {song.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{song.artist}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-cyan-100 text-cyan-800 rounded-full">
                          {song.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {song.liturgicalTime}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                          {song.key}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {song.tempo} BPM
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {song.lastModified}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(song)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4 mr-1" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleViewLyrics(song)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <EyeIcon className="w-4 h-4 mr-1" />
                            Ver Letra
                          </button>
                          <button
                            onClick={() => handleDelete(song.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingSong && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Editar Canción
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSave(editingSong);
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={editingSong.title}
                      onChange={e =>
                        setEditingSong({
                          ...editingSong,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Artista
                    </label>
                    <input
                      type="text"
                      value={editingSong.artist}
                      onChange={e =>
                        setEditingSong({
                          ...editingSong,
                          artist: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={editingSong.category}
                      onChange={e =>
                        setEditingSong({
                          ...editingSong,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {categories
                        .filter(cat => cat !== "all")
                        .map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo Litúrgico
                    </label>
                    <select
                      value={editingSong.liturgicalTime}
                      onChange={e =>
                        setEditingSong({
                          ...editingSong,
                          liturgicalTime: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {liturgicalTimes
                        .filter(time => time !== "all")
                        .map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tonalidad
                    </label>
                    <input
                      type="text"
                      value={editingSong.key}
                      onChange={e =>
                        setEditingSong({ ...editingSong, key: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempo (BPM)
                    </label>
                    <input
                      type="number"
                      value={editingSong.tempo}
                      onChange={e =>
                        setEditingSong({
                          ...editingSong,
                          tempo: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Letra y Acordes
                  </label>
                  <textarea
                    value={editingSong.lyrics || ""}
                    onChange={e =>
                      setEditingSong({ ...editingSong, lyrics: e.target.value })
                    }
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                    placeholder="Ingresa la letra y acordes de la canción..."
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lyrics Modal */}
        {viewingLyrics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {viewingLyrics.title}
                  </h2>
                  <p className="text-gray-600">{viewingLyrics.artist}</p>
                </div>
                <button
                  onClick={() => setViewingLyrics(null)}
                  className="text-gray-400 hover:text-gray-600"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                  {viewingLyrics.lyrics}
                </pre>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewingLyrics(null)}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
